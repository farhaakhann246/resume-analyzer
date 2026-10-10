import { extractResumeText } from "../providers/document/pdf.provider.js";
import { generateResumeAnalysis } from "./analysis.service.js";

const MAX_RESUME_TEXT_LENGTH = 60000;

export async function processResume({ file, jobDescription }) {
  if (!file?.buffer?.length) {
    const error = new Error("Please upload a PDF resume.");
    error.statusCode = 400;
    throw error;
  }

  if (!Buffer.from(file.buffer).subarray(0, 1024).includes(Buffer.from("%PDF-"))) {
    const error = new Error("The uploaded file is not a valid PDF.");
    error.statusCode = 400;
    throw error;
  }

  const normalizedJobDescription = jobDescription?.trim();

  if (!normalizedJobDescription || normalizedJobDescription.length < 30) {
    const error = new Error("Please provide a job description of at least 30 characters.");
    error.statusCode = 400;
    throw error;
  }

  if (normalizedJobDescription.length > 20000) {
    const error = new Error("The job description must not exceed 20,000 characters.");
    error.statusCode = 400;
    throw error;
  }

  const { text, pageCount } = await extractResumeText(file.buffer);

  if (text.length > MAX_RESUME_TEXT_LENGTH) {
    const error = new Error(
      "The extracted resume text is too long to analyze. Please upload a shorter resume."
    );
    error.statusCode = 413;
    throw error;
  }

  const analysis = await generateResumeAnalysis({
    resumeText: text,
    jobDescription: normalizedJobDescription
  });

  return {
    filename: file.originalname,
    pageCount,
    analysis
  };
}