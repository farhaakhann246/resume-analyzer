import { useState } from "react";
import ResumeUploader from "./components/ResumeUploader";
import AnalysisDashboard from "./components/AnalysisDashboard";
import { analyzeResume } from "./services/resume.service";
import "./App.css";

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze(input) {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await analyzeResume(input);
      setResult(data);
    } catch (err) {
      setError(err.message || "Resume analysis failed.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">AI-POWERED CAREER TOOL</p>
        <h1>Resume Analyzer</h1>
        <p>
          Understand your resume, compare it with a target role, and discover
          opportunities to improve.
        </p>
      </header>

      <main className="main-content">
        <section className="upload-panel">
          <h2>Analyze your resume</h2>
          <p className="muted">
            Upload a PDF and paste the job description you are targeting.
          </p>
          <ResumeUploader onAnalyze={handleAnalyze} loading={loading} />

          {loading && (
            <p className="loading-message" role="status">
              Processing your resume. This may take a little while...
            </p>
          )}

          {error && (
            <div className="error-message" role="alert">
              {error}
            </div>
          )}
        </section>

        {result && <AnalysisDashboard result={result} />}
      </main>

      <footer className="app-footer">
        Resume Analyzer · AI-assisted feedback, with human review
      </footer>
    </div>
  );
}
