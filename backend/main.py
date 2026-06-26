"""BugBaba AI - FastAPI Backend Entry Point."""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from config import settings
from routers import analyze as analyze_router

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="BugBaba AI",
    description="Funny AI-powered code review tool",
    version="1.0.0",
)

app.state.limiter = limiter

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(
        status_code=429,
        content={"detail": "Slow down! BugBaba needs a chai break \u2615"},
    )


app.include_router(analyze_router.router, prefix="/api")


@app.get("/api/health")
def health():
    mode = "live" if settings.NVIDIA_API_KEY else "demo"
    return {"status": "ok", "ai_mode": mode, "version": "1.0.0"}
