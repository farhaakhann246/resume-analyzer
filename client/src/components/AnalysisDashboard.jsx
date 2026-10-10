import ScoreCard from "./ScoreCard";

function ListSection({ title, items, emptyMessage = "No items identified." }) {
  return (
    <section className="result-section">
      <h3>{title}</h3>
      {items?.length ? (
        <ul>
          {items.map((item, index) => (
            <li key={`${title}-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">{emptyMessage}</p>
      )}
    </section>
  );
}

export default function AnalysisDashboard({ result }) {
  if (!result) return null;

  const { filename, pageCount, analysis } = result;

  return (
    <section className="analysis-dashboard" aria-live="polite">
      <div className="dashboard-heading">
        <div>
          <p className="eyebrow">ANALYSIS REPORT</p>
          <h2>{filename}</h2>
          <p className="muted">
            {pageCount != null ? `${pageCount} pages` : "Page count unavailable"}
          </p>
        </div>
      </div>

      {analysis.summary.startsWith("Mock analysis completed.") && (
        <div className="mock-notice">
          <strong>Demo mode:</strong> These are placeholder results, not
          genuine AI findings. Configure the OpenAI provider for real analysis.
        </div>
      )}

      <div className="score-grid">
        <ScoreCard
          title="Resume Quality"
          score={analysis.overallScore}
          description="Overall resume review"
        />
        <ScoreCard
          title="Job Match"
          score={analysis.jobMatch.score}
          description="Estimated alignment with the supplied job"
        />
        <ScoreCard
          title="ATS Readiness"
          score={analysis.ats.score}
          description="Heuristic formatting and keyword assessment"
        />
      </div>

      <section className="result-section">
        <h3>Professional Summary</h3>
        <p>{analysis.summary}</p>
      </section>

      <section className="result-section">
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> {analysis.contact.name || "Not identified"}</p>
        <p><strong>Email:</strong> {analysis.contact.email || "Not identified"}</p>
        <p><strong>Phone:</strong> {analysis.contact.phone || "Not identified"}</p>
        <p><strong>Location:</strong> {analysis.contact.location || "Not identified"}</p>
      </section>

      <section className="result-section">
        <h3>Skills</h3>
        {Object.entries(analysis.skills).map(([category, skills]) => (
          <div className="skill-group" key={category}>
            <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
            {skills.length ? (
              <div className="skill-list">
                {skills.map((skill) => (
                  <span className="skill-tag" key={skill}>{skill}</span>
                ))}
              </div>
            ) : (
              <p className="muted">No skills identified.</p>
            )}
          </div>
        ))}
      </section>

      <section className="result-section">
        <h3>Work Experience</h3>
        {analysis.experience.length ? (
          analysis.experience.map((job, index) => (
            <article className="experience-card" key={`${job.company}-${index}`}>
              <h4>{job.role || "Role not identified"}</h4>
              <p>{job.company || "Company not identified"} · {job.duration || "Duration not identified"}</p>
              <ListSection title="Highlights" items={job.highlights} />
            </article>
          ))
        ) : (
          <p className="muted">No work experience identified in this analysis.</p>
        )}
      </section>

      <section className="result-section">
        <h3>Education</h3>
        {analysis.education.length ? (
          analysis.education.map((item, index) => (
            <p key={`${item.institution}-${index}`}>
              <strong>{item.qualification}</strong>
              {" — "}{item.institution}
              {item.year ? ` (${item.year})` : ""}
            </p>
          ))
        ) : (
          <p className="muted">No education details identified.</p>
        )}
      </section>

      <section className="result-section">
        <h3>Job Description Match</h3>
        <p>{analysis.jobMatch.explanation}</p>
        <ListSection title="Matched Keywords" items={analysis.jobMatch.matchedKeywords} />
        <ListSection title="Potentially Missing Keywords" items={analysis.jobMatch.missingKeywords} />
        <ListSection title="Relevant Experience" items={analysis.jobMatch.relevantExperience} />
      </section>

      <section className="result-section">
        <h3>ATS Review</h3>
        <p><strong>Keyword coverage:</strong> {analysis.ats.keywordCoverage}</p>
        <p><strong>Readability:</strong> {analysis.ats.readability}</p>
        <ListSection title="Formatting Issues" items={analysis.ats.formattingIssues} />
      </section>

      <div className="result-columns">
        <ListSection title="Strengths" items={analysis.strengths} />
        <ListSection title="Areas to Improve" items={analysis.weaknesses} />
      </div>

      <ListSection
        title="Actionable Suggestions"
        items={analysis.suggestions}
      />

      <p className="disclaimer">
        Scores are estimates for guidance only. Review extracted details and
        suggestions for accuracy; a score does not predict hiring outcomes
        or guarantee ATS performance.
      </p>
    </section>
  );
}
