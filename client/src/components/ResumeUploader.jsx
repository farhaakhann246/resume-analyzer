import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ResumeUploader({
  onAnalyze,
  loading
}) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState("");

  function handleFileChange(event) {
    const selected = event.target.files?.[0] || null;

    setError("");

    if (!selected) {
      setFile(null);
      return;
    }

    if (selected.type !== "application/pdf") {
      setFile(null);
      setError("Please select a PDF file.");
      event.target.value = "";
      return;
    }

    if (selected.size > MAX_FILE_SIZE) {
      setFile(null);
      setError("The PDF must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    setFile(selected);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!file) {
      setError("Please select your resume PDF.");
      return;
    }

    if (jobDescription.trim().length < 30) {
      setError("Please enter a job description with at least 30 characters.");
      return;
    }

    try {
      await onAnalyze({ file, jobDescription });
    } catch (err) {
      setError(err.message || "Analysis failed. Please try again.");
    }
  }

  return (
    <form className="resume-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="resume">Upload your resume</label>
        <input
          id="resume"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          disabled={loading}
        />
        {file && (
          <p className="file-info">
            {file.name} · {(file.size / 1024).toFixed(1)} KB
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="job-description">Job description</label>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(event) => setJobDescription(event.target.value)}
          placeholder="Paste the job description you want to target..."
          rows={7}
          maxLength={20000}
          disabled={loading}
          required
        />
        <p className="field-hint">
          {jobDescription.length}/20,000 characters
        </p>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !file || jobDescription.trim().length < 30}
      >
        {loading ? "Analyzing resume..." : "Analyze Resume"}
      </button>

      <p className="privacy-note">
        Your resume is processed in memory and is not intentionally stored
        by this application.
      </p>
    </form>
  );
}
