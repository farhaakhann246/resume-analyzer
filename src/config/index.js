import "dotenv/config";

const port = Number(process.env.PORT) || 3000;
const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const llmProvider = process.env.LLM_PROVIDER || "mock";
const openAIKey = process.env.OPENAI_API_KEY || "";
const openAIModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const maxResumeSizeMb = Number(process.env.MAX_RESUME_SIZE_MB) || 5;
const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000;
const rateLimitMaxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 30;

if (!["mock", "openai"].includes(llmProvider)) {
  throw new Error("LLM_PROVIDER must be either 'mock' or 'openai'.");
}

export const config = {
  port,
  clientUrl,
  llmProvider,
  openAIKey,
  openAIModel,
  maxResumeSizeBytes: maxResumeSizeMb * 1024 * 1024,
  rateLimitWindowMs,
  rateLimitMaxRequests
};
