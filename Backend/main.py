from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from yt_dlp import YoutubeDL
from models import VideoRequest
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from fastapi.responses import FileResponse
import threading
import time
import os


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def delete_file_later(path, delay=60):
    """Delete file after `delay` seconds in a background thread."""
    def delete():
        time.sleep(delay)
        if os.path.exists(path):
            os.remove(path)
            print(f"Deleted {path}")
    threading.Thread(target=delete).start()

def get_video_info(url: str):
    
    ydl_opts = {
        "quiet": True,
        "extractor_args": {
            "youtube": {
                "player_client": ["android", "web", "tv"]
            }
        }
    }
    
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

# def delete_file_later(path):
#     def delete():
#         import time
#         time.sleep(60)
#         if os.path.exists(path):
#             os.remove(path)
#         threading.Thread(target=delete).start()
        
@app.post("/download")
def download_video(request: VideoRequest):
    url = request.url
    
    ydl_opts = {
        "format": "bestvideo[height<=720]+bestaudio/best",
        "outtmpl": "temp/%(title)s.%(ext)s",
        "merge_output_format": "mp4",
        "quiet": True,
        "extractor_args": {
            "youtube": {
                "player_client": ["android", "web", "tv"]
            }
        }
    }
    
    try:
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url)
            filename = ydl.prepare_filename(info)
    except Exception:
        raise HTTPException(status_code=400, detail="Failed to download video")
    
    delete_file_later(filename, delay=600)
    
    if not os.path.exists(filename):
        raise HTTPException(status_code=500, detail="Video file not found after download")

    return FileResponse(
        path=filename,
        media_type='application/octet-stream',
        filename=Path(filename).name
    )
    # delete_file_later(filename)

