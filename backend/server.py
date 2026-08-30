from fastapi import FastAPI, APIRouter, Request
from fastapi.responses import StreamingResponse, JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
import uuid
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY")
ADMIN_KEY = os.environ.get("ADMIN_KEY")

logger = logging.getLogger(__name__)


class ConsultationCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    age: int = Field(ge=1, le=120)
    location: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=6, max_length=20)
    chief_complaint: str = Field(min_length=2, max_length=500)
    goal: Optional[str] = ""


@api_router.get("/")
async def root():
    return {"message": "Dr. Yogesh Kumar API"}


@api_router.post("/consultations")
async def create_consultation(input: ConsultationCreate):
    doc = input.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["status"] = "new"
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.consultations.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


@api_router.get("/consultations")
async def list_consultations(request: Request):
    if ADMIN_KEY and request.headers.get("x-admin-key") != ADMIN_KEY:
        return JSONResponse(status_code=401, content={"detail": "unauthorized"})
    docs = await db.consultations.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return {"consultations": docs}


SYSTEM_PROMPT = """You are the patient-education assistant on the personal website of Dr. Yogesh Kumar, MDS Prosthodontics — a Prosthodontist & Implantologist in Chennai specialising in complex oral rehabilitation (full-mouth rehabilitation, full-arch implants such as All-on-4/All-on-6, advanced implants including zygomatic and pterygoid implants, and smile/aesthetic rehabilitation).

Voice: calm, specialist, evidence-led, patient-centred. Confident but never boastful.

Rules:
- Give general educational information only. Never diagnose, never promise outcomes, never quote prices, never use fear marketing.
- Explain that complex treatment starts with understanding the problem, not choosing a procedure.
- For elderly patients, acknowledge that family members often help make decisions — speak to both.
- Keep answers concise (under 120 words), in plain language a 70-year-old and their adult child can understand.
- Always end by gently suggesting a specialist consultation with Dr. Yogesh for anything case-specific, via the Request a Consultation form or WhatsApp.
- If asked about medical emergencies, advise seeking immediate local care."""


class AskRequest(BaseModel):
    session_id: str = Field(min_length=4, max_length=64)
    message: str = Field(min_length=1, max_length=2000)


@api_router.post("/ask")
async def ask(input: AskRequest):
    if not EMERGENT_LLM_KEY:
        return JSONResponse(status_code=503, content={"detail": "assistant not configured"})

    history = await db.chat_messages.find(
        {"session_id": input.session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(20)

    if history:
        prior = "\n".join(
            f"{'Patient' if m['role'] == 'user' else 'Assistant'}: {m['content']}"
            for m in history[-10:]
        )
        prompt = f"Conversation so far:\n{prior}\n\nPatient: {input.message}"
    else:
        prompt = input.message

    async def event_gen():
        from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

        full = []
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=input.session_id,
            system_message=SYSTEM_PROMPT,
        ).with_model("openai", "gpt-5.4")
        try:
            async for ev in chat.stream_message(UserMessage(text=prompt)):
                if isinstance(ev, TextDelta):
                    full.append(ev.content)
                    yield f"data: {json.dumps({'delta': ev.content})}\n\n"
                elif isinstance(ev, StreamDone):
                    break
        except Exception as e:
            logger.error(f"LLM stream error: {e}")
            yield f"data: {json.dumps({'delta': 'I am unavailable right now. Please reach out on WhatsApp at +91 90434 32286 and Dr. Yogesh’s team will help you.'})}\n\n"
        yield "data: [DONE]\n\n"

        now = datetime.now(timezone.utc).isoformat()
        await db.chat_messages.insert_many([
            {"session_id": input.session_id, "role": "user", "content": input.message, "created_at": now},
            {"session_id": input.session_id, "role": "assistant", "content": "".join(full), "created_at": now},
        ])

    return StreamingResponse(
        event_gen(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
