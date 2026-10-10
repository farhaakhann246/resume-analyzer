import { z } from "zod";

const scoreSchema = z.number().int().min(0).max(100);

const contactSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  location: z.string()
});

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  duration: z.string(),
  highlights: z.array(z.string())
});

const educationSchema = z.object({
  qualification: z.string(),
  institution: z.string(),
  year: z.string()
});

const skillsSchema = z.object({
  technical: z.array(z.string()),
  tools: z.array(z.string()),
  soft: z.array(z.string()),
  languages: z.array(z.string())
});

const jobMatchSchema = z.object({
  score: scoreSchema,
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()),
  relevantExperience: z.array(z.string()),
  explanation: z.string()
});

const atsSchema = z.object({
  score: scoreSchema,
  formattingIssues: z.array(z.string()),
  keywordCoverage: z.string(),
  readability: z.string()
});

export const resumeAnalysisSchema = z.object({
  overallScore: scoreSchema,
  summary: z.string(),
  contact: contactSchema,
  skills: skillsSchema,
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
  jobMatch: jobMatchSchema,
  ats: atsSchema,
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  suggestions: z.array(z.string())
});

export function validateResumeAnalysis(data) {
  return resumeAnalysisSchema.parse(data);
}