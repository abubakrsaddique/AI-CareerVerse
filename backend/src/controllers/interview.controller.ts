import { Request, Response } from "express";

export const interview = async (req: Request, res: Response) => {
  const { role } = req.body;

  const questions = [
    `Explain ${role} basics`,
    `What are key skills in ${role}?`,
    `Describe a project you built`,
  ];

  res.json({ questions });
};
