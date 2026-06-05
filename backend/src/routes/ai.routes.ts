import { Router } from "express";
import { generateRoadmap } from "../controllers/ai.controller";

const router = Router();

router.post("/roadmap", generateRoadmap);

export default router;
