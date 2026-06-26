"""Application configuration loaded from environment."""
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    NVIDIA_API_KEY: str = os.environ.get("NVIDIA_API_KEY", "").strip()
    NVIDIA_BASE_URL: str = os.environ.get(
        "NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1"
    )
    NVIDIA_MODEL: str = os.environ.get(
        "NVIDIA_MODEL", "meta/llama-3.1-70b-instruct"
    )
    MAX_CODE_LENGTH: int = 10_000


settings = Settings()
