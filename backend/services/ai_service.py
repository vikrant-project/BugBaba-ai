"""AI service: NVIDIA NIM calls + mock fallback."""
import httpx
from typing import Dict, Any

from config import settings
from services.prompt_builder import build_system_prompt
from services.response_parser import parse_ai_response


def is_live_mode() -> bool:
    return bool(settings.NVIDIA_API_KEY)


def _mock_response(code: str, language: str, roast_mode: str) -> Dict[str, Any]:
    """Realistic demo response that exercises every UI card."""
    roast_lines = {
        "Soft Roast": (
            "Hey, I can see you're learning \u2014 and that's awesome! Just a few gentle nudges: "
            "your variable names could be a bit kinder to future-you, and that loop is doing "
            "the cha-cha when it should be walking straight. With a little love, this could "
            "really shine!"
        ),
        "Savage Roast": (
            "This code is so bad, Stack Overflow flagged it as a cry for help. I've seen tighter "
            "logic in a Magic 8-Ball. Your variables are named like you lost a bet, and this "
            "loop runs slower than a tortoise on melatonin. Bravo. Truly. *slow clap*"
        ),
        "Teacher Mode": (
            "Alright, class, let's think about why this is a problem.\n"
            "1) Naming: future-you will not thank present-you for 'x1'.\n"
            "2) Bounds: we never validate the input \u2014 always question your data.\n"
            "3) Resources: arrays that grow forever are memory leaks in disguise.\n"
            "Take a breath, refactor, and try again. You've got this."
        ),
        "Interviewer Mode": (
            "Thank you for your submission. While we appreciate your enthusiasm for creative "
            "solutions, the committee has concerns about variable naming conventions, error "
            "handling, and a complete absence of input validation. We will not be moving forward."
        ),
        "Desi Funny Mode": (
            "Bhai, yeh kya scene hai? Itna spaghetti code dekh ke toh meri aankh mein aansoo aa "
            "gaye. Variable 'x1'? Beta, naam meaningful rakhne ki kasam khao. Aur input validation? "
            "Woh toh tumhare project mein chai ki tarah missing hai. Chalo, ek aur cup banao aur "
            "code refactor karo \u2014 jugaad nahi, proper engineering."
        ),
        "Startup CTO Mode": (
            "Ship it. We'll fix it post-launch \u2014 just like the last 47 things. Tech debt? "
            "That's a Series B problem. Right now we need velocity. Yes, the loop is O(n\u00b2) and "
            "there's a hardcoded password, but the deck slides for Friday won't write themselves. "
            "Pivot, disrupt, repeat."
        ),
    }
    return {
        "bug_summary": "Demo Mode: 3 bugs, 1 security issue, and a couple of performance smells detected.",
        "bugs": [
            "No input validation \u2014 negative or non-integer inputs crash the function.",
            "Loop mutates the iterator variable mid-iteration causing off-by-one results.",
            "Unbounded array growth across calls leads to memory exhaustion.",
        ],
        "security_issues": [
            "Hardcoded credential detected (password literal in source).",
        ],
        "logic_mistakes": [
            "Variable reassignment order in the Fibonacci step produces incorrect values.",
            "Edge case n=0 returns an empty array instead of [0].",
        ],
        "performance_problems": [
            "Function recomputes results that could be memoized.",
            "List append in a hot loop without pre-allocation.",
        ],
        "fixed_code": (
            "# Demo fixed version\n"
            f"# Language: {language}\n"
            "def example(n):\n"
            "    if n < 0:\n"
            "        raise ValueError('n must be non-negative')\n"
            "    a, b, out = 0, 1, []\n"
            "    for _ in range(n):\n"
            "        out.append(a)\n"
            "        a, b = b, a + b\n"
            "    return out\n"
        ),
        "beginner_explanation": (
            "Think of this code like a recipe. The recipe forgot to check if the ingredients are "
            "valid, mixed two steps in the wrong order, and kept adding leftovers to a giant "
            "bowl forever. The fixed version checks the inputs, follows the steps in the right "
            "order, and uses a fresh bowl each time."
        ),
        "roast": roast_lines.get(roast_mode, roast_lines["Savage Roast"]),
        "quality_score": 4,
        "difficulty_level": "Intermediate",
        "interview_feedback": (
            "Candidate demonstrates familiarity with basic syntax but lacks rigor in input "
            "handling and resource management. With mentorship, growth is possible. Recommendation: "
            "Hire with caution \u2014 pair-program for the first 90 days."
        ),
        "mode_used": roast_mode,
    }


async def _call_nvidia(messages, stricter: bool = False) -> str:
    url = f"{settings.NVIDIA_BASE_URL}/chat/completions"
    headers = {
        "Authorization": f"Bearer {settings.NVIDIA_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": settings.NVIDIA_MODEL,
        "messages": messages,
        "max_tokens": 4096,
        "temperature": 0.4 if stricter else 0.7,
        "stream": False,
    }
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.post(url, headers=headers, json=payload)
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"]


async def analyze_code(code: str, language: str, roast_mode: str) -> Dict[str, Any]:
    if not is_live_mode():
        return _mock_response(code, language, roast_mode)

    system_prompt = build_system_prompt(language, roast_mode)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": code},
    ]
    raw = await _call_nvidia(messages)
    parsed = parse_ai_response(raw, roast_mode)
    if parsed:
        return parsed

    # Retry once with stricter prompt
    strict_prompt = build_system_prompt(language, roast_mode, stricter=True)
    messages_strict = [
        {"role": "system", "content": strict_prompt},
        {"role": "user", "content": code},
    ]
    raw2 = await _call_nvidia(messages_strict, stricter=True)
    parsed2 = parse_ai_response(raw2, roast_mode)
    if parsed2:
        return parsed2

    raise ValueError("AI response could not be parsed as JSON after retry")
