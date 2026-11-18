import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  LockKeyhole,
  MoreHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { IconButton } from "./IconButton.jsx";

export function FindingDrawer({ selected, setSelected, updateStatus, notify }) {
  return (
    <>
      <button
        className="drawer-scrim"
        aria-label="Close finding details"
        onClick={() => setSelected(null)}
      />
      <aside className="detail-drawer" aria-label="Finding details">
        <div className="drawer-top">
          <span>FINDING DETAILS</span>
          <div>
            <IconButton
              label="More finding actions"
              onClick={() => notify("More actions are coming soon")}
            >
              <MoreHorizontal size={18} />
            </IconButton>
            <IconButton label="Close details" onClick={() => setSelected(null)}>
              <X size={18} />
            </IconButton>
          </div>
        </div>
        <div className="drawer-content">
          <div className="drawer-id">
            <span
              className={`severity-pill ${selected.severity.toLowerCase()}`}
            >
              <i />
              {selected.severity}
            </span>
            <span>{selected.id}</span>
          </div>
          <h2>{selected.title}</h2>
          <a
            className="cve-link"
            href={`https://nvd.nist.gov/vuln/detail/${selected.cve}`}
            target="_blank"
            rel="noreferrer"
          >
            {selected.cve} <ExternalLink size={13} />
          </a>
          <div className="risk-score">
            <div>
              <span>CVSS SCORE</span>
              <strong>
                {selected.score.toFixed(1)}
                <small> / 10</small>
              </strong>
            </div>
            <span className={`risk-label ${selected.severity.toLowerCase()}`}>
              {selected.severity} risk
            </span>
          </div>
          <div className="drawer-action">
            <button
              className={`btn ${selected.status === "Resolved" ? "btn-quiet" : "btn-primary"} full-btn`}
              onClick={() =>
                updateStatus(
                  selected,
                  selected.status === "Resolved" ? "Open" : "Resolved",
                )
              }
            >
              {selected.status === "Resolved" ? (
                <Activity size={16} />
              ) : (
                <CheckCircle2 size={16} />
              )}{" "}
              {selected.status === "Resolved"
                ? "Reopen finding"
                : "Mark as resolved"}
            </button>
          </div>
          <div className="detail-block">
            <h3>About this finding</h3>
            <p>{selected.description}</p>
          </div>
          <div className="detail-block">
            <h3>Affected asset</h3>
            <div className="asset-detail">
              <span className={`asset-icon ${selected.color}`}>
                <LockKeyhole size={15} />
              </span>
              <div>
                <strong>{selected.asset}</strong>
                <span>
                  {selected.type} · {selected.env}
                </span>
              </div>
            </div>
            <div className="detail-pair">
              <span>IP address</span>
              <strong>{selected.ip}</strong>
            </div>
            <div className="detail-pair">
              <span>Owning team</span>
              <strong>{selected.team}</strong>
            </div>
          </div>
          <div className="detail-block">
            <h3>Recommended remediation</h3>
            <div className="recommendation">
              <div className="recommend-icon">
                <Sparkles size={15} />
              </div>
              <p>{selected.fix}</p>
            </div>
          </div>
          <div className="detail-block">
            <h3>Risk signals</h3>
            <div className="signal-list">
              {selected.signals.map((x) => (
                <span key={x}>
                  <AlertTriangle size={13} />
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="drawer-meta">
            <div>
              <span>STATUS</span>
              <strong
                className={`status-pill ${selected.status.toLowerCase().replace(" ", "-")}`}
              >
                <i />
                {selected.status}
              </strong>
            </div>
            <div>
              <span>DEADLINE</span>
              <strong>{selected.due}</strong>
            </div>
            <div>
              <span>ASSIGNED TO</span>
              <strong>
                <span className={`avatar owner-avatar ${selected.color}`}>
                  {selected.owner}
                </span>
                {selected.team}
              </strong>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
