// import { Request, Response } from "express";
// import axios from "axios";
// import FormData from "form-data";
// import Resume from "../models/resume.model";
// import User from "../models/User";

// /**Upload + Analyze Resume (FastAPI + DB save)*/
// export const uploadAndAnalyzeResume = async (req: any, res: Response) => {
//   try {
//     const file = req.file;
//     const userId = req.user?.userId;

//     if (!file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     if (!userId) {
//       return res.status(401).json({
//         message: "Unauthorized user",
//       });
//     }

//     // CREATE FORM DATA FOR FASTAPI
//     const formData = new FormData();

//     formData.append("file", file.buffer, {
//       filename: file.originalname,
//       contentType: file.mimetype,
//     });

//     //  CALL FASTAPI
//     const aiResponse = await axios.post(
//       "http://127.0.0.1:8000/analyze-resume",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//         },
//         timeout: 30000,
//         maxBodyLength: Infinity,
//         maxContentLength: Infinity,
//       },
//     );

//     const aiData = aiResponse.data;
//     const user = await User.findById(userId);

//     const extractedName =
//       aiData?.name ||
//       aiData?.summary?.split("\n")[0]?.trim() ||
//       user?.name ||
//       "Unknown User";

//     const resume = await Resume.create({
//       userId,
//       filename: file.originalname,
//       analysis: {
//         name: extractedName,
//         score: aiData.score,
//         skills: aiData.skills,
//         summary: aiData.summary,
//       },
//     });

//     return res.status(200).json({
//       message: "Resume analyzed successfully",
//       data: aiData,
//       resumeId: resume._id,
//     });
//   } catch (err: any) {
//     console.error(" AI PIPELINE ERROR:", err?.response?.data || err.message);

//     return res.status(500).json({
//       message: "AI pipeline failed",
//       error: err?.response?.data || err.message,
//     });
//   }
// };

// export const getLatestResume = async (req: any, res: Response) => {
//   try {
//     const userId = req.user?.userId;

//     if (!userId) {
//       return res.status(401).json({
//         message: "Unauthorized user",
//       });
//     }

//     const resume = await Resume.findOne({ userId }).sort({
//       createdAt: -1,
//     });

//     if (!resume) {
//       return res.status(404).json({
//         message: "No resume found",
//       });
//     }

//     return res.status(200).json(resume.analysis);
//   } catch (err) {
//     console.error("GET LATEST RESUME ERROR:", err);

//     return res.status(500).json({
//       message: "Failed to fetch resume",
//     });
//   }
// };
// import { Request, Response } from "express";
// import axios from "axios";
// import FormData from "form-data";
// import Resume from "../models/resume.model";
// import User from "../models/User";

// /** Upload + Analyze Resume */
// export const uploadAndAnalyzeResume = async (req: any, res: Response) => {
//   try {
//     const file = req.file;
//     const userId = req.user?.userId;

//     if (!file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized user" });
//     }

//     const formData = new FormData();

//     formData.append("file", file.buffer, {
//       filename: file.originalname,
//       contentType: file.mimetype,
//     });

//     const aiResponse = await axios.post(
//       "http://127.0.0.1:8000/analyze-resume",
//       formData,
//       {
//         headers: {
//           ...formData.getHeaders(),
//         },
//       },
//     );

//     const aiData = aiResponse.data;
//     const user = await User.findById(userId);

//     const extractedName = user?.name || "Unknown Candidate";

//     await Resume.create({
//       userId,
//       filename: file.originalname,
//       analysis: {
//         name: extractedName,
//         score: aiData.score,
//         skills: aiData.skills,
//         summary: aiData.summary,
//       },
//     });

//     return res.status(200).json({
//       message: "Resume analyzed successfully",
//       data: {
//         name: extractedName,
//         score: aiData.score,
//         skills: aiData.skills,
//         summary: aiData.summary,
//       },
//     });
//   } catch (err: any) {
//     console.error("AI PIPELINE ERROR:", err?.response?.data || err.message);

//     return res.status(500).json({
//       message: "AI pipeline failed",
//       error: err?.response?.data || err.message,
//     });
//   }
// };

// /** Get Latest Resume */
// export const getLatestResume = async (req: any, res: Response) => {
//   try {
//     const userId = req.user?.userId;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized user" });
//     }

//     const resume = await Resume.findOne({ userId }).sort({ createdAt: -1 });

//     if (!resume) {
//       return res.status(404).json({ message: "No resume found" });
//     }

//     return res.status(200).json({
//       name: resume.analysis?.name,
//       score: resume.analysis?.score,
//       skills: resume.analysis?.skills,
//       summary: resume.analysis?.summary,
//     });
//   } catch (err) {
//     console.error("GET LATEST RESUME ERROR:", err);

//     return res.status(500).json({
//       message: "Failed to fetch resume",
//     });
//   }
// };
import { Request, Response } from "express";
import axios from "axios";
import FormData from "form-data";
import Resume from "../models/resume.model";

/** Upload Resume */
export const uploadAndAnalyzeResume = async (req: any, res: Response) => {
  try {
    const file = req.file;
    const userId = req.user?.userId;

    if (!file) return res.status(400).json({ message: "No file uploaded" });
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const formData = new FormData();
    formData.append("file", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const aiResponse = await axios.post(
      "http://127.0.0.1:8000/analyze-resume",
      formData,
      {
        headers: formData.getHeaders(),
      },
    );

    const aiData = aiResponse.data;

    // ✅ SAVE ONLY AI DATA (NO USER NAME)
    const resume = await Resume.create({
      userId,
      filename: file.originalname,
      analysis: {
        name: aiData.name,
        score: aiData.score,
        skills: aiData.skills,
        summary: aiData.summary,
      },
    });

    return res.status(200).json({
      message: "Resume analyzed",
      data: aiData,
      resumeId: resume._id,
    });
  } catch (err: any) {
    return res.status(500).json({
      message: "AI error",
      error: err.message,
    });
  }
};

/** Get Latest Resume */
export const getLatestResume = async (req: any, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const resume = await Resume.findOne({ userId }).sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }

    return res.status(200).json({
      name: resume.analysis?.name ?? "Unknown Candidate",
      score: resume.analysis?.score ?? 0,
      skills: resume.analysis?.skills ?? [],
      summary: resume.analysis?.summary ?? "",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};
