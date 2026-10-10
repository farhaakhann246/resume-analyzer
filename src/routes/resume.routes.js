import { Router } from "express";
import { analyzeResumeController } from "../controllers/resume.controller.js";
import { uploadResume } from "../middleware/upload.middleware.js";

const router = Router();

router.post("/", uploadResume, analyzeResumeController);

export default router;