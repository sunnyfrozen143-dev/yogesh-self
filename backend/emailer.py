import os
import re
import ipaddress
import logging
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent / '.env')
logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def _row(label: str, value: str) -> str:
    return (f'<tr><td style="padding:8px 16px;font-size:11px;letter-spacing:1px;'
            f'text-transform:uppercase;color:#64748b;white-space:nowrap;vertical-align:top">{label}</td>'
            f'<td style="padding:8px 16px;font-size:14px;color:#0f172a">{escape(value)}</td></tr>')


async def notify_new_consultation(doc: dict) -> None:
    if not (EMAIL_KEY and EMAIL_FROM_NAME and OWNER_EMAIL):
        logger.warning("Email alert skipped: email env vars not configured")
        return
    try:
        subject = f"New consultation request — {doc['name']} ({doc['location']})"
        slot = ""
        if doc.get("mode") == "online_screening" and (doc.get("preferred_date") or doc.get("preferred_time")):
            slot = _row("Requested slot", f"{doc.get('preferred_date') or 'Any day'} · {doc.get('preferred_time') or 'Any time'}")
        html = (
            '<table role="presentation" width="100%" style="max-width:560px;font-family:Arial,sans-serif;'
            'border:1px solid #e2e8f0;border-collapse:collapse">'
            '<tr><td colspan="2" style="padding:20px 16px;background:#0f172a;color:#f4f4f0;'
            'font-size:16px">New consultation request</td></tr>'
            + _row("Name", doc["name"])
            + _row("Age", str(doc["age"]))
            + _row("Location", doc["location"])
            + _row("Phone / WhatsApp", doc["phone"])
            + _row("Chief concern", doc["chief_complaint"])
            + _row("Goal", doc.get("goal") or "—")
            + _row("Preferred mode", "Online screening (video)" if doc.get("mode") == "online_screening" else "In-person · Chennai")
            + slot
            + _row("Received", doc["created_at"])
            + '<tr><td colspan="2" style="padding:16px;font-size:12px;color:#888">'
            f'Sent by {escape(EMAIL_FROM_NAME)}. Open your enquiries dashboard (/admin on your website) '
            'to manage this request. We never ask for passwords or payment details by email.'
            '</td></tr></table>'
        )
        await send_email(to=OWNER_EMAIL, subject=subject, html=html)
        logger.info(f"Consultation alert emailed to {OWNER_EMAIL}")
    except Exception as e:
        logger.error(f"Consultation alert email failed: {e}")
