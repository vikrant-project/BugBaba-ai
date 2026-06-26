"""Pydantic schemas for request/response models."""
from typing import List
from pydantic import BaseModel, Field, field_validator

ALLOWED_LANGUAGES = {
    "Python", "JavaScript", "TypeScript", "Java", "C", "C++", "C#",
    "Go", "Rust", "PHP", "Ruby", "Swift", "Kotlin", "SQL", "HTML",
    "CSS", "Bash", "R", "MATLAB", "Dart",
}

ALLOWED_ROAST_MODES = {
    "Soft Roast", "Savage Roast", "Teacher Mode",
    "Interviewer Mode", "Desi Funny Mode", "Startup CTO Mode",
}


class AnalyzeRequest(BaseModel):
    code: str = Field(..., min_length=1, max_length=10000)
    language: str
    roast_mode: str

    @field_validator("language")
    @classmethod
    def lang_valid(cls, v):
        if v not in ALLOWED_LANGUAGES:
            raise ValueError(f"Unsupported language: {v}")
        return v

    @field_validator("roast_mode")
    @classmethod
    def mode_valid(cls, v):
        if v not in ALLOWED_ROAST_MODES:
            raise ValueError(f"Unsupported roast mode: {v}")
        return v


class AnalyzeResponse(BaseModel):
    bug_summary: str
    bugs: List[str]
    security_issues: List[str]
    logic_mistakes: List[str]
    performance_problems: List[str]
    fixed_code: str
    beginner_explanation: str
    roast: str
    quality_score: int
    difficulty_level: str
    interview_feedback: str
    mode_used: str
