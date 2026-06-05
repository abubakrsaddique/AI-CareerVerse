import { Response } from "express";
import Resume from "../models/resume.model";

export const getAnalytics = async (req: any, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    // Get all resumes for this user
    const resumes = await Resume.find({ userId });

    const resumesUploaded = resumes.length;

    // Total score calculation
    const totalScore = resumes.reduce((acc, item: any) => {
      return acc + (item.analysis?.score || 0);
    }, 0);

    const averageScore =
      resumesUploaded > 0 ? Math.round(totalScore / resumesUploaded) : 0;

    // Interviews practiced (SAFE FIX)
    const interviewsPracticed = resumes.reduce((acc, item: any) => {
      return acc + (item.analysis?.interviewsPracticed || 0);
    }, 0);

    return res.status(200).json({
      resumesUploaded,
      averageScore,
      interviewsPracticed,
    });
  } catch (err) {
    console.error("ANALYTICS ERROR:", err);

    return res.status(500).json({
      message: "Failed to fetch analytics",
    });
  }
};
