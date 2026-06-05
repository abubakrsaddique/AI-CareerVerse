import { Request, Response } from "express";

export const generateRoadmap = async (req: Request, res: Response) => {
  const { goal } = req.body;

  const roadmap = {
    goal,
    steps: [
      "Learn Basics",
      "Build Projects",
      "Advanced Concepts",
      "System Design",
      "Deploy Apps",
    ],
  };

  res.json(roadmap);
};
