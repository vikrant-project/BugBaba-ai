"""POST /api/analyze endpoint."""
import httpx
from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address

from models.schemas import AnalyzeRequest, AnalyzeResponse
from services.ai_service import analyze_code

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/analyze", response_model=AnalyzeResponse)
@limiter.limit("10/minute")
async def analyze(request: Request, body: AnalyzeRequest):
    try:
        result = await analyze_code(body.code, body.language, body.roast_mode)
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=503,
            detail=f"BugBaba's brain (NVIDIA API) is napping: {e.response.status_code}",
        )
    except httpx.RequestError:
        raise HTTPException(status_code=503, detail="Could not reach the AI service. Try again in a sec.")
    except ValueError as e:
        raise HTTPException(status_code=502, detail=f"AI returned an unparseable response: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")
    return result
