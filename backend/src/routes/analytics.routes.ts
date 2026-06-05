import { Router } from "express";
import { getAnalytics } from "../controllers/analytics.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/analytics", authMiddleware, getAnalytics);

export default router;
