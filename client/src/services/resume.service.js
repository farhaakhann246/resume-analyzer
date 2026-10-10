const API_BASE_URL = "http://localhost:3000/api";

export async function analyzeResume({ file, jobDescription }) {
  const formData = new FormData();

  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  const response = await fetch(`${API_BASE_URL}/resumes`, {
    method: "POST",
    body: formData
  });

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      result?.error?.message || "Unable to analyze the resume."
    );
  }

  return result.data;
}