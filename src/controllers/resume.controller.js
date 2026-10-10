import { z } from "zod";
import { processResume } from "../services/resume.service.js";

const requestSchema = z.object({
  jobDescription: z.string().trim().min(30).max(20000),
});

export async function analyzeResumeController(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: {
          message: "Please upload a PDF resume.",
          requestId: req.id,
        },
      });
    }

    const parsed = requestSchema.safeParse({
      jobDescription: req.body?.jobDescription,
    });

    if (!parsed.success) {
      return res.status(400).json({
        error: {
          message:
            "Please provide a valid job description between 30 and 20,000 characters.",
          requestId: req.id,
        },
      });
    }

    const result = await processResume({
      file: req.file,
      jobDescription: parsed.data.jobDescription,
    });

    return res.status(200).json({
      data: result,
      meta: {
        requestId: req.id,
        provider: process.env.LLM_PROVIDER || "mock",
      },
    });
  } catch (error) {
    next(error);
  }
}
