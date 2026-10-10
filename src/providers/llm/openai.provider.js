import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { config } from "../../config/index.js";
import { resumeAnalysisSchema } from "../../schemas/resume-analysis.schema.js";
import { RESUME_ANALYSIS_INSTRUCTIONS } from "./instructions.js";
import { validateResumeAnalysis } from "../../schemas/resume-analysis.schema.js";

let client;

function getClient() {
  if (!config.openAIKey) {
    throw new Error("OPENAI_API_KEY is required for the OpenAI provider.");
  }

  if (!client) {
    client = new OpenAI({ apiKey: config.openAIKey });
  }

  return client;
}

export async function analyzeWithOpenAI({ resumeText, jobDescription }) {
  const openAI = getClient();

  const response = await openAI.responses.parse({
    model: config.openAIModel,
    instructions: RESUME_ANALYSIS_INSTRUCTIONS,
    input: `
RESUME TEXT
===========
${resumeText}

JOB DESCRIPTION
===============
${jobDescription}
`,
    text: {
      format: zodTextFormat(resumeAnalysisSchema, "resume_analysis"),
    },
  });

  if (!response.output_parsed) {
    throw new Error(
      "The AI provider did not return a valid structured analysis.",
    );
  }

  return validateResumeAnalysis(response.output_parsed);
}
