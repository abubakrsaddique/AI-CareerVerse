# AI CareerVerse

## Overview

An AI-powered Resume Analyzer that extracts insights from your resume and gives instant feedback like skills, score, and AI-generated summary.

## Features

- Upload PDF Resume
- AI extracts candidate name automatically
- Resume scoring system (0–100)
- Skill extraction & normalization
- Fully responsive and clean frontend interface.
- Real-time dashboard updates
- Modern animated UI

## Tech Stack

### Frontend

      - Next.js
      - React.js
      - TypeScript
      - Tailwind CSS
      - GSAP Animations
      - Axios

### Backend

      - Node.js
      - Express.js
      - MongoDB + Mongoose
      - Multer (File Uploads)
      - JWT Authentication

### AI Service

      - FastAPI (Python)
      - PyMuPDF (PDF parsing)
      - Custom NLP logic for:
         - Skill extraction
         - Name detection
         - Resume scoring

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/yourusername/ai-careerverse.git

   ```

2. Navigate to the project directory:

   ```shell
    cd frontend
    cd backend

   ```

3. Install the dependencies:

   ```shell
    npm install

   ```

4. Start the development server:

   ```shell
   npm run dev

   ```

5. Start the AI server:

   ```shell
   cd ai-service
   pip install -r requirements.txt
   python -m venv venv
    # Windows
   venv\Scripts\activate
     # macOS/Linux
   source venv/bin/activate
   run: uvicorn main:app --reload
   ```

   ## Author

- [@abubakrsaddique](https://github.com/abubakrsaddique)
