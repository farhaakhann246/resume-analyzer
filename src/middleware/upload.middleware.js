import multer from "multer";
import { config } from "../config/index.js";

export const uploadResume = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: config.maxResumeSizeBytes,
    files: 1
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== "application/pdf") {
      const error = new Error("Only PDF resumes are allowed.");
      error.statusCode = 400;
      return callback(error);
    }

    callback(null, true);
  }
}).single("resume");