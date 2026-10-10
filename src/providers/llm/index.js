import { config } from "../../config/index.js";
import { analyzeWithMock } from "./mock.provider.js";
import { analyzeWithOpenAI } from "./openai.provider.js";

export async function analyzeResume(input) {
  if (config.llmProvider === "mock") {
    return analyzeWithMock(input);
  }

  if (config.llmProvider === "openai") {
    return analyzeWithOpenAI(input);
  }

  throw new Error("Unsupported LLM provider.");
}