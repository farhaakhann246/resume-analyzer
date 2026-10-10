import { validateResumeAnalysis } from "../../schemas/resume-analysis.schema.js";

export async function analyzeWithMock({ resumeText, jobDescription }) {
  const resumeWords = resumeText.trim().split(/\s+/).length;
  const jobDescriptionProvided = Boolean(jobDescription.trim());

  const result = {
    overallScore: 50,
    summary: `Mock analysis completed. The resume contains approximately ${resumeWords} words. Configure the OpenAI provider for genuine resume analysis.`,
    contact: {
      name: "",
      email: "",
      phone: "",
      location: ""
    },
    skills: {
      technical: [],
      tools: [],
      soft: [],
      languages: []
    },
    experience: [],
    education: [],
    jobMatch: {
      score: 50,
      matchedKeywords: [],
      missingKeywords: [],
      relevantExperience: [],
      explanation: jobDescriptionProvided
        ? "Mock result only. Configure OpenAI for an actual comparison."
        : "No job description was provided."
    },
    ats: {
      score: 50,
      formattingIssues: [],
      keywordCoverage: "Not evaluated by the mock provider.",
      readability: "Not evaluated by the mock provider."
    },
    strengths: [],
    weaknesses: [],
    suggestions: [
      "Switch to the OpenAI provider to generate a real analysis.",
      "Review all extracted details for accuracy before using the report."
    ]
  };

  return validateResumeAnalysis(result);
}