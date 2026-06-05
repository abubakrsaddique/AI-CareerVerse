import { Router } from "express";
import multer from "multer";
import {
  uploadAndAnalyzeResume,
  getLatestResume,
} from "../controllers/resume.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const storage = multer.memoryStorage();

/**
 *  PDF ONLY FILTER
 */
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadAndAnalyzeResume,
);
router.get("/latest", authMiddleware, getLatestResume);

export default router;
