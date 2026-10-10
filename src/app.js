import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { config } from "./config/index.js";
import { requestIdMiddleware } from "./middleware/request-id.middleware.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import resumeRoutes from "./routes/resume.routes.js";

const app = express();

app.disable("x-powered-by");
app.use(requestIdMiddleware);
app.use(helmet());
app.use(cors({ origin: config.clientUrl }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "resume-analyzer"
  });
});

const analysisLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  limit: config.rateLimitMaxRequests,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: {
        message: "Too many analysis requests. Please try again later.",
        requestId: req.id
      }
    });
  }
});

app.use("/api/resumes", analysisLimiter, resumeRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found.",
      requestId: req.id
    }
  });
});

app.use(errorMiddleware);

export default app;