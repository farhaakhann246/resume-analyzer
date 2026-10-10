import multer from "multer";

export function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let statusCode = Number(error.statusCode) || 500;
  let message = error.message || "An unexpected error occurred.";

  if (error instanceof multer.MulterError) {
    statusCode = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    message = error.code === "LIMIT_FILE_SIZE"
      ? "The resume exceeds the maximum allowed file size."
      : "The uploaded file could not be accepted.";
  } else if (error.status === 429 || error.statusCode === 429) {
    statusCode = 503;
    message = "The AI service is temporarily unavailable or has reached a usage limit.";
  } else if (statusCode >= 500) {
    statusCode = 500;
    message = "Unable to analyze the resume right now. Please try again later.";
  }

  console.error({
    requestId: req.id,
    errorName: error.name || "Error",
    statusCode
  });

  return res.status(statusCode).json({
    error: {
      message,
      requestId: req.id
    }
  });
}