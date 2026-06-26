# 🐛🔥 BugBaba AI

```
 ____              ____        _              _    ___ 
| __ ) _   _  __ _| __ )  __ _| |__   __ _   / \  |_ _|
|  _ \| | | |/ _` |  _ \ / _` | '_ \ / _` | / _ \  | | 
| |_) | |_| | (_| | |_) | (_| | |_) | (_| |/ ___ \ | | 
|____/ \__,_|\__, |____/ \__,_|_.__/ \__,_/_/   \_\___|
             |___/                                     
```

**We roast your code so your users don't have to.**

![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

BugBaba AI is a funny, savage, and genuinely useful AI-powered code review tool. Paste code, pick a language and roast mode, and get back a full analysis — bugs, security issues, fixes, beginner explanations, interview feedback, a quality score, and a hilarious roast in one of six modes.

---

## Why BugBaba AI?

| Feature | BugBaba AI | Generic Linters | ChatGPT |
|---|---|---|---|
| Funny roast mode | ✅ 6 modes | ❌ | ❌ |
| Fixed code output | ✅ | ❌ | ✅ |
| Security analysis | ✅ | Partial | ✅ |
| Beginner explanation | ✅ | ❌ | ✅ |
| Interview feedback | ✅ | ❌ | ❌ |
| Downloadable PDF | ✅ | ❌ | ❌ |
| Free NVIDIA API | ✅ | N/A | ❌ |
| Works offline (demo) | ✅ | ✅ | ❌ |
| No login required | ✅ | Varies | ✅ |
| Dark futuristic UI | ✅ | ❌ | ❌ |

---

## Features

**11 analysis outputs per review**

- 🐛 Bug summary with count and full list
- 🔒 Security issues with severity badges
- 🧠 Logic mistakes
- ⚡ Performance problems
- ✅ Fully fixed version of your code (copy with one click)
- 👶 Beginner-friendly explanation
- 🎤 Roast in your chosen mode
- 📊 Quality score (0–10) with animated ring
- 🎯 Difficulty label: Beginner → God-Tier
- 💼 Formal interviewer feedback with verdict
- ⬇ PDF report download

**6 roast modes**

| Mode | Vibe |
|---|---|
| 🌸 Soft Roast | Gentle, encouraging |
| 🔥 Savage Roast | No mercy, pure comedy |
| 📚 Teacher Mode | Patient, educational |
| 💼 Interviewer Mode | Corporate cuts |
| 🥘 Desi Funny Mode | Hinglish + chai vibes |
| 🚀 Startup CTO Mode | Ship it, fix in v2 |

---

## Quick Start

```bash
git clone https://github.com/vikrant-project/BugBaba-ai.git
cd BugBaba-ai

# Backend
cd backend && python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
echo "NVIDIA_API_KEY=your_key_here" > .env   # optional — leave blank for demo mode
uvicorn main:app --host 0.0.0.0 --port 8478 &

# Frontend
cd ../frontend && npm install && npm run dev
```

Open http://localhost:5173 — paste some cursed code, pick a roast mode, hit Analyze.

---

## Ubuntu VPS Setup

```bash
# 1. System packages
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-venv python3-pip nodejs npm nginx git curl
sudo npm install -g pm2

# 2. Clone
cd ~ && git clone https://github.com/vikrant-project/BugBaba-ai.git bugbaba
cd ~/bugbaba

# 3. Backend
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
echo "NVIDIA_API_KEY=your_key_here" > .env
pm2 start "uvicorn main:app --host 0.0.0.0 --port 8478" --name bugbaba-api --cwd $(pwd)

# 4. Frontend build
cd ../frontend && npm install && npm run build
sudo mkdir -p /var/www/bugbaba && sudo cp -r dist/* /var/www/bugbaba/

# 5. Nginx
sudo cp ../deploy/nginx.conf /etc/nginx/sites-available/bugbaba
sudo ln -sf /etc/nginx/sites-available/bugbaba /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 6. Persistence
pm2 save && pm2 startup
```

Open `http://<your-vps-ip>:5478`.

---

## Environment Variables

| Name | Required | Default | Description |
|---|---|---|---|
| `NVIDIA_API_KEY` | No | empty → demo mode | NVIDIA NIM API key. Get one free at https://build.nvidia.com |
| `NVIDIA_BASE_URL` | No | `https://integrate.api.nvidia.com/v1` | NIM endpoint |
| `NVIDIA_MODEL` | No | `meta/llama-3.1-70b-instruct` | Model name |

---

## API Reference

### `POST /api/analyze`

Request:
```json
{ "code": "print(1/0)", "language": "Python", "roast_mode": "Savage Roast" }
```

Response (truncated):
```json
{
  "bug_summary": "...",
  "bugs": ["..."],
  "security_issues": [],
  "logic_mistakes": ["..."],
  "performance_problems": ["..."],
  "fixed_code": "...",
  "beginner_explanation": "...",
  "roast": "...",
  "quality_score": 4,
  "difficulty_level": "Intermediate",
  "interview_feedback": "...",
  "mode_used": "Savage Roast"
}
```

Rate limit: **10 requests / IP / minute**. Exceeding returns:
`{"detail": "Slow down! BugBaba needs a chai break ☕"}` (HTTP 429).

### `GET /api/health`

```json
{ "status": "ok", "ai_mode": "live", "version": "1.0.0" }
```

---

## Project Structure

```
bugbaba/
├── backend/
│   ├── main.py
│   ├── config.py
│   ├── routers/analyze.py
│   ├── services/
│   │   ├── ai_service.py
│   │   ├── prompt_builder.py
│   │   └── response_parser.py
│   ├── models/schemas.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/...
│   │   ├── hooks/...
│   │   └── utils/...
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── deploy/nginx.conf
└── README.md
```

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite + Tailwind |
| Code editor | CodeMirror 6 |
| Backend | FastAPI + Uvicorn |
| AI | NVIDIA NIM (`meta/llama-3.1-70b-instruct`) |
| PDF | jsPDF |
| Reverse proxy | Nginx (port 5478) |
| Process mgr | PM2 |

---

## Contributing

PRs welcome. Keep it funny, keep it useful. Add a new roast mode? Open an issue first.

---

## License

MIT
