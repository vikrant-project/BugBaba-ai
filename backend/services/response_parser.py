"""Parse and validate the AI JSON response."""
import json
import re
from typing import Optional, Dict, Any

REQUIRED_FIELDS = [
    "bug_summary", "bugs", "security_issues", "logic_mistakes",
    "performance_problems", "fixed_code", "beginner_explanation",
    "roast", "quality_score", "difficulty_level", "interview_feedback",
    "mode_used",
]


def _extract_json(text: str) -> Optional[str]:
    """Strip markdown fences and locate the outermost JSON object."""
    if not text:
        return None
    text = text.strip()
    fenced = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", text, re.DOTALL)
    if fenced:
        return fenced.group(1)
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        return text[start:end + 1]
    return None


def parse_ai_response(raw: str, roast_mode: str) -> Optional[Dict[str, Any]]:
    candidate = _extract_json(raw)
    if not candidate:
        return None
    try:
        data = json.loads(candidate)
    except json.JSONDecodeError:
        return None
    if not isinstance(data, dict):
        return None
    for field in REQUIRED_FIELDS:
        if field not in data:
            if field in ("bugs", "security_issues", "logic_mistakes", "performance_problems"):
                data[field] = []
            elif field == "quality_score":
                data[field] = 5
            elif field == "mode_used":
                data[field] = roast_mode
            else:
                data[field] = ""
    try:
        score = int(data["quality_score"])
    except (TypeError, ValueError):
        score = 5
    data["quality_score"] = max(0, min(10, score))
    for k in ("bugs", "security_issues", "logic_mistakes", "performance_problems"):
        if not isinstance(data[k], list):
            data[k] = [str(data[k])]
        data[k] = [str(x) for x in data[k]]
    for k in ("bug_summary", "fixed_code", "beginner_explanation", "roast",
              "difficulty_level", "interview_feedback", "mode_used"):
        if not isinstance(data[k], str):
            data[k] = str(data[k])
    return data
