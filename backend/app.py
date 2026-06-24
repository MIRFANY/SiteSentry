from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from src.orchestrator import Orchestrator
import shutil
import os

app = FastAPI(title="SiteSentry API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = Orchestrator()

@app.get("/")
def health_check():
    return {"status": "SiteSentry API is running"}

@app.post("/analyze")
async def analyze_report(
    file: UploadFile = File(...),
    project_type: str = Form(default="residential"),
    city_tier: str = Form(default="tier_2")
):
    # Save uploaded file
    upload_path = f"uploads/{file.filename}"
    with open(upload_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run pipeline
    result = orchestrator.process(upload_path, project_type, city_tier)

    # Cleanup uploaded file
    os.remove(upload_path)

    return result