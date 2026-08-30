"""Backend API tests for Dr. Yogesh Kumar consultation site."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://specialist-smile-1.preview.emergentagent.com').rstrip('/')
ADMIN_KEY = "yk-admin-9043432286"


@pytest.fixture
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture
def admin(api):
    api.headers.update({"x-admin-key": ADMIN_KEY})
    return api


# --- Root ---
def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert "message" in r.json()


# --- Consultations list auth ---
def test_list_consultations_no_key(api):
    r = api.get(f"{BASE_URL}/api/consultations")
    assert r.status_code == 401


def test_list_consultations_wrong_key(api):
    r = api.get(f"{BASE_URL}/api/consultations", headers={"x-admin-key": "wrong"})
    assert r.status_code == 401


def test_list_consultations_valid(admin):
    r = admin.get(f"{BASE_URL}/api/consultations")
    assert r.status_code == 200
    data = r.json()
    assert "consultations" in data
    assert isinstance(data["consultations"], list)


# --- Create + verify ---
@pytest.fixture(scope="module")
def created_id():
    payload = {
        "name": "TEST_Backend_QA",
        "age": 45,
        "location": "Chennai",
        "phone": "+919999900000",
        "chief_complaint": "TEST_backend automated test entry — safe to delete",
        "goal": "TEST"
    }
    r = requests.post(f"{BASE_URL}/api/consultations", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["ok"] is True
    assert "id" in data
    return data["id"]


def test_create_persisted(admin, created_id):
    r = admin.get(f"{BASE_URL}/api/consultations")
    assert r.status_code == 200
    ids = [c["id"] for c in r.json()["consultations"]]
    assert created_id in ids
    # Verify no _id leaks
    for c in r.json()["consultations"]:
        assert "_id" not in c


def test_create_validation_error(api):
    r = api.post(f"{BASE_URL}/api/consultations", json={"name": "x", "age": 200, "location": "", "phone": "", "chief_complaint": ""})
    assert r.status_code == 422


# --- PATCH tests ---
def test_patch_no_auth(api, created_id):
    r = api.patch(f"{BASE_URL}/api/consultations/{created_id}", json={"status": "contacted"})
    assert r.status_code == 401


def test_patch_invalid_status(admin, created_id):
    r = admin.patch(f"{BASE_URL}/api/consultations/{created_id}", json={"status": "bogus"})
    assert r.status_code == 422


def test_patch_unknown_id(admin):
    r = admin.patch(f"{BASE_URL}/api/consultations/nonexistent-id-xyz", json={"status": "contacted"})
    assert r.status_code == 404


def test_patch_valid_and_persist(admin, created_id):
    r = admin.patch(f"{BASE_URL}/api/consultations/{created_id}", json={"status": "contacted"})
    assert r.status_code == 200
    assert r.json()["ok"] is True
    # verify persistence
    r2 = admin.get(f"{BASE_URL}/api/consultations")
    match = [c for c in r2.json()["consultations"] if c["id"] == created_id]
    assert match and match[0]["status"] == "contacted"
