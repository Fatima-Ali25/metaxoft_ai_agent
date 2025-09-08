from fastapi import FastAPI
from pydantic import BaseModel
import asyncio
from .agent import run_agent
from fastapi.middleware.cors import CORSMiddleware
from .ai_services import services as AI_SERVICES

app = FastAPI()

# Enable CORS so the Next.js app (localhost:3000) can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    message: str

@app.get("/chat")
def home():
    return {"status": "Metaxoft Backend Running 🚀"}

@app.get("/services")
def get_services():
    return {"services": AI_SERVICES}

@app.post("/chat")
async def chat(query: Query):
    reply = await run_agent(query.message)
    return {"reply": reply}

