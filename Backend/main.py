from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from yt_dlp import YoutubeDL
from models import VideoRequest
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_video_info(url: str):
    try:
        with YoutubeDL() as ydl:
            info = ydl.extract_info(url, download=False)

            return {
                "title": info.get("title"),
                "thumbnail": info.get("thumbnail")
            }
    except Exception:
        return None

@app.post("/preview")
def preview_video(request: VideoRequest):
    info = get_video_info(request.url)

    if not info:
        raise HTTPException(status_code=400, detail="Invalid or unavailable video")

    return info