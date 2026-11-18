import React from "react";

export function Metric({ icon, label, value, note, tone, change }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span className={`metric-icon ${tone}`}>{icon}</span>
        <span className="metric-change">
          {tone === "red" && <i />}
          {change}
        </span>
      </div>
      <div className="metric-value">{value}</div>
      <strong className="metric-label">{label}</strong>
      <span className="metric-note">{note}</span>
    </div>
  );
}
export function SeverityRow({ color, label, count }) {
  return (
    <div className="severity-row">
      <span>
        <i className={`severity-dot ${color}`} />
        {label}
      </span>
      <strong>{count}</strong>
    </div>
  );
}
