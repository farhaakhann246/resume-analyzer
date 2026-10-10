export default function ScoreCard({ title, score, description }) {
  const safeScore = Number.isFinite(score)
    ? Math.max(0, Math.min(100, score))
    : 0;

  return (
    <article className="score-card">
      <p className="score-label">{title}</p>
      <p className="score-value">{safeScore}<span>/100</span></p>
      <div
        className="score-track"
        role="progressbar"
        aria-label={title}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeScore}
      >
        <div
          className="score-fill"
          style={{ width: `${safeScore}%` }}
        />
      </div>
      <p className="score-description">{description}</p>
    </article>
  );
}
