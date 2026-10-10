import { PDFParse } from "pdf-parse";
import { cleanExtractedText } from "../../utils/text-cleaning.js";

export async function extractResumeText(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw new Error("A valid PDF buffer is required.");
  }

  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    const text = cleanExtractedText(result.text || "");

    if (!text || text.length < 50) {
      throw new Error(
        "Unable to extract enough text from this PDF. It may be scanned or image-based."
      );
    }

    return {
      text,
      pageCount: result.total ?? null
    };
  } finally {
    await parser.destroy();
  }
}