import { analyzeResume } from "../providers/llm/index.js";

export async function generateResumeAnalysis({ resumeText, jobDescription }) {
  return analyzeResume({
    resumeText,
    jobDescription
  });
}