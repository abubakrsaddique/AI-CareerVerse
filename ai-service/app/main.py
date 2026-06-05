# from fastapi import FastAPI, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import fitz

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# def extract_text(pdf_bytes):
#     doc = fitz.open(stream=pdf_bytes, filetype="pdf")
#     text = ""
#     for page in doc:
#         text += page.get_text()
#     return text


# # ✅ Extract NAME from resume
# def extract_name(text: str):
#     lines = text.split("\n")

#     for line in lines[:15]:
#         line = line.strip()

#         if len(line) < 3:
#             continue
#         if "@" in line:
#             continue
#         if any(char.isdigit() for char in line):
#             continue
#         if "resume" in line.lower():
#             continue

#         return line

#     return "Unknown Candidate"


# @app.post("/analyze-resume")
# async def analyze_resume(file: UploadFile = File(...)):
#     content = await file.read()
#     text = extract_text(content)

#     name = extract_name(text)

#     keywords = [
#         "Python", "Next", "React", "Node", "AI", "ML", "DL",
#         "SQL", "JavaScript", "ReactJS", "NextJS", "NodeJS",
#         "ExpressJS", "Firebase", "MongoDb", "TypeScript"
#     ]

#     skills = []
#     for skill in keywords:
#         if skill.lower() in text.lower():
#             skills.append(skill)

#     score = min(len(skills) * 15, 100)

#     return {
#         "name": name,
#         "skills": skills,
#         "score": score,
#         "summary": text[:200]
#     }

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# PDF TEXT EXTRACTION
# -----------------------------
def extract_text(pdf_bytes):
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text


# -----------------------------
# NAME EXTRACTION (SMART)
# -----------------------------
def extract_name(text: str):
    lines = text.split("\n")

    for line in lines[:15]:
        line = line.strip()

        if len(line) < 3:
            continue
        if "@" in line:
            continue
        if any(char.isdigit() for char in line):
            continue
        if "resume" in line.lower():
            continue
        if "cv" in line.lower():
            continue

        # likely name (2–4 words)
        if re.match(r"^[A-Za-z\s]{3,50}$", line):
            return line

    return "Unknown Candidate"


# -----------------------------
# SKILL EXTRACTION (FIXED)
# -----------------------------
def normalize(text: str):
    return re.sub(r"[^a-zA-Z0-9+]", " ", text.lower())


def extract_skills(text: str):
    normalized_text = normalize(text)

    skill_map = {
        "javascript": "JavaScript",
        "reactjs": "ReactJS",
        "nextjs": "NextJS",
        "nodejs": "NodeJS",
        "expressjs": "ExpressJS",
        "firebase": "Firebase",
        "mongodb": "MongoDb",
        "typescript": "TypeScript",
        "ai":"AI"
    }

    found = set()

    for key, value in skill_map.items():
        if key in normalized_text:
            found.add(value)

    return list(found)


# -----------------------------
# MAIN API
# -----------------------------
@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    content = await file.read()
    text = extract_text(content)

    # NAME
    name = extract_name(text)

    # SKILLS
    skills = extract_skills(text)

    # SCORE
    score = min(len(skills) * 15, 100)

    return {
        "name": name,
        "skills": skills,
        "score": score,
        "summary": text[:250]
    }