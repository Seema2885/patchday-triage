import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { IconButton } from "./components/IconButton.jsx";
import { Metric, SeverityRow } from "./components/OverviewItems.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { Topbar } from "./components/Topbar.jsx";
import { FindingsSection } from "./components/FindingsSection.jsx";
import { FindingDrawer } from "./components/FindingDrawer.jsx";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowDownUp,
  ArrowUpRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Download,
  ExternalLink,
  Filter,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  Menu,
  MoreHorizontal,
  Search,
  Settings2,
  Shield,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import "./styles.css";

const seed = [
  {
    id: "VUL-2841",
    title: "OpenSSL buffer overflow",
    cve: "CVE-2025-1097",
    severity: "Critical",
    score: 9.8,
    asset: "api-gateway-prod-01",
    team: "Platform",
    env: "Production",
    age: "18 min",
    owner: "MP",
    color: "violet",
    status: "Open",
    due: "Today, 4:00 PM",
    type: "Public-facing service",
    ip: "10.24.8.19",
    description:
      "A heap buffer overflow in OpenSSL may allow a remote attacker to execute arbitrary code during TLS handshake negotiation.",
    fix: "Upgrade OpenSSL to 3.2.4 or apply the vendor security patch. Restart the gateway after deployment.",
    signals: [
      "Known exploited vulnerability",
      "Publicly reachable",
      "Exploit available",
    ],
  },
  {
    id: "VUL-2839",
    title: "Linux kernel privilege escalation",
    cve: "CVE-2025-0282",
    severity: "Critical",
    score: 9.1,
    asset: "payments-worker-03",
    team: "Payments",
    env: "Production",
    age: "42 min",
    owner: "JT",
    color: "amber",
    status: "Open",
    due: "Today, 4:30 PM",
    type: "Compute instance",
    ip: "10.24.13.6",
    description:
      "A race condition in the Linux kernel could allow a local user to gain elevated privileges on affected systems.",
    fix: "Apply the patched kernel package and schedule a rolling restart. Confirm the active kernel version after reboot.",
    signals: ["Known exploited vulnerability", "Production workload"],
  },
  {
    id: "VUL-2835",
    title: "Exposed admin console",
    cve: "CVE-2024-6387",
    severity: "High",
    score: 8.1,
    asset: "admin-console-prod",
    team: "IT Operations",
    env: "Production",
    age: "2 hr",
    owner: "AR",
    color: "blue",
    status: "In progress",
    due: "Today, 6:00 PM",
    type: "Web application",
    ip: "10.24.4.31",
    description:
      "An authentication bypass in the admin console may expose privileged operations to unauthenticated users.",
    fix: "Restrict inbound access to the VPN while applying the latest vendor release. Rotate the console service credentials.",
    signals: ["Publicly reachable", "Administrative interface"],
  },
  {
    id: "VUL-2828",
    title: "Outdated lodash dependency",
    cve: "CVE-2024-9112",
    severity: "High",
    score: 7.5,
    asset: "customer-portal-web",
    team: "Web Platform",
    env: "Production",
    age: "3 hr",
    owner: "SK",
    color: "green",
    status: "Open",
    due: "Tomorrow",
    type: "Container image",
    ip: "10.24.7.22",
    description:
      "A prototype pollution vulnerability exists in the installed lodash version and could affect unsafe object merges.",
    fix: "Upgrade lodash to 4.17.22 and rebuild the production container image.",
    signals: ["Production workload", "Fix available"],
  },
  {
    id: "VUL-2824",
    title: "Weak TLS cipher suites enabled",
    cve: "CVE-2024-7720",
    severity: "Medium",
    score: 6.2,
    asset: "edge-proxy-eu-west",
    team: "Infrastructure",
    env: "Production",
    age: "5 hr",
    owner: "MP",
    color: "violet",
    status: "Open",
    due: "In 3 days",
    type: "Network appliance",
    ip: "10.24.2.8",
    description:
      "The edge proxy accepts legacy cipher suites that reduce the security of encrypted connections.",
    fix: "Disable legacy cipher suites in the proxy configuration and validate client compatibility.",
    signals: ["Publicly reachable"],
  },
  {
    id: "VUL-2817",
    title: "Unpatched PostgreSQL extension",
    cve: "CVE-2024-6398",
    severity: "Medium",
    score: 5.8,
    asset: "analytics-db-staging",
    team: "Data",
    env: "Staging",
    age: "Yesterday",
    owner: "JT",
    color: "amber",
    status: "In progress",
    due: "Nov 20",
    type: "Database server",
    ip: "10.31.12.14",
    description:
      "A flaw in a PostgreSQL extension could permit privilege escalation by an authenticated database user.",
    fix: "Update the extension package in the staging image and run the integration test suite.",
    signals: ["Fix available"],
  },
  {
    id: "VUL-2809",
    title: "Missing security headers",
    cve: "CVE-2024-5021",
    severity: "Low",
    score: 3.4,
    asset: "docs-site-prod",
    team: "Web Platform",
    env: "Production",
    age: "2 days",
    owner: "SK",
    color: "green",
    status: "Open",
    due: "Nov 24",
    type: "Web application",
    ip: "10.24.7.48",
    description:
      "The documentation site is missing several recommended browser security headers.",
    fix: "Add Content-Security-Policy, X-Content-Type-Options, and Referrer-Policy headers.",
    signals: ["Publicly reachable"],
  },
  {
    id: "VUL-2798",
    title: "Unencrypted internal service traffic",
    cve: "CVE-2024-4810",
    severity: "Low",
    score: 2.9,
    asset: "metrics-collector-02",
    team: "Infrastructure",
    env: "Development",
    age: "4 days",
    owner: "AR",
    color: "blue",
    status: "Resolved",
    due: "Resolved",
    type: "Compute instance",
    ip: "10.18.3.5",
    description:
      "Metrics traffic between internal services is transmitted without transport encryption.",
    fix: "Enable mTLS between the collector and the metrics backend.",
    signals: ["Internal network"],
  },
];
const severityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
export function App() {
  const [items, setItems] = useState(seed);
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("All severity");
  const [status, setStatus] = useState("All statuses");
  const [sort, setSort] = useState("Priority");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [range, setRange] = useState("Last 7 days");
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2800);
    return () => clearTimeout(t);
  }, [toast]);
  const filtered = useMemo(() => {
    let rows = items.filter((x) =>
      `${x.id} ${x.title} ${x.cve} ${x.asset} ${x.team}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
    if (severity !== "All severity")
      rows = rows.filter((x) => x.severity === severity);
    if (status !== "All statuses")
      rows = rows.filter((x) => x.status === status);
    return rows.sort((a, b) =>
      sort === "Priority"
        ? severityOrder[a.severity] - severityOrder[b.severity] ||
          b.score - a.score
        : sort === "Newest"
          ? items.indexOf(a) - items.indexOf(b)
          : a.asset.localeCompare(b.asset),
    );
  }, [items, query, severity, status, sort]);
  const activeItems = items.filter((x) => x.status !== "Resolved");
  const severityCounts = ["Critical", "High", "Medium", "Low"].map(
    (name) => activeItems.filter((x) => x.severity === name).length,
  );
  const severityColors = ["#d95c4c", "#e8a340", "#dfc575", "#7bb092"];
  let severityStart = 0;
  const severityGradient = severityCounts
    .map((count, i) => {
      const from = severityStart;
      severityStart += activeItems.length
        ? (count / activeItems.length) * 360
        : 0;
      return `${severityColors[i]} ${from}deg ${severityStart}deg`;
    })
    .join(", ");
  const counts = {
    critical: items.filter(
      (x) => x.severity === "Critical" && x.status !== "Resolved",
    ).length,
    open: items.filter((x) => x.status === "Open").length,
    progress: items.filter((x) => x.status === "In progress").length,
    assets: new Set(
      items.filter((x) => x.status !== "Resolved").map((x) => x.asset),
    ).size,
  };
  const updateStatus = (item, next) => {
    setItems((prev) =>
      prev.map((x) => (x.id === item.id ? { ...x, status: next } : x)),
    );
    setSelected({ ...item, status: next });
    setToast(
      next === "Resolved"
        ? `${item.id} marked as resolved`
        : `${item.id} moved to ${next.toLowerCase()}`,
    );
  };
  const reload = () => {
    setError(false);
    setLoading(true);
    setTimeout(() => {
      if (Math.random() < 0.2) {
        setError(true);
        setLoading(false);
      } else setLoading(false);
    }, 700);
  };
  const exportCsv = () => {
    const rows = [
      ["ID", "Finding", "CVE", "Severity", "Score", "Asset", "Team", "Status"],
      ...filtered.map((x) => [
        x.id,
        x.title,
        x.cve,
        x.severity,
        x.score,
        x.asset,
        x.team,
        x.status,
      ]),
    ];
    const csv = rows
      .map((r) =>
        r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","),
      )
      .join("\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    a.download = "patchday-findings.csv";
    a.click();
    URL.revokeObjectURL(a.href);
    setToast(`Exported ${filtered.length} findings`);
  };
  return (
    <div className="app-shell">
      <Sidebar
        itemsCount={items.length}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        notify={setToast}
      />
      <main className="main">
        <Topbar setMobileNav={setMobileNav} notify={setToast} />
        <div className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow">
                <span className="live-dot" />
                WEDNESDAY, NOVEMBER 18, 2026
              </div>
              <h1>
                Good morning, Seema <span className="wave">✳</span>
              </h1>
              <p>Here’s the security picture across your environment.</p>
            </div>
            <div className="heading-actions">
              <button className="btn btn-quiet" onClick={exportCsv}>
                <Download size={16} />
                Export
              </button>
              <button className="btn btn-primary" onClick={reload}>
                <Activity size={16} />
                Refresh data
              </button>
            </div>
          </div>
          <div className="status-banner">
            <div className="status-check">
              <Check size={14} />
            </div>
            <div>
              <strong>All systems operational</strong>
              <span>Last scan completed 12 minutes ago</span>
            </div>
            <span className="banner-divider" />
            <span className="banner-meta">
              <span className="live-dot" />
              Continuous monitoring active
            </span>
            <ArrowUpRight className="banner-arrow" size={16} />
          </div>
          <section className="metrics" aria-label="Security overview metrics">
            <Metric
              icon={<ShieldAlert size={17} />}
              label="Critical findings"
              value={counts.critical}
              note="Needs immediate attention"
              tone="red"
              change="2 new"
            />
            <Metric
              icon={<AlertTriangle size={17} />}
              label="Open findings"
              value={counts.open}
              note="Across your environment"
              tone="amber"
              change="−3 this week"
            />
            <Metric
              icon={<Clock3 size={17} />}
              label="In progress"
              value={counts.progress}
              note="Currently being addressed"
              tone="blue"
              change="2 teams"
            />
            <Metric
              icon={<LockKeyhole size={17} />}
              label="Affected assets"
              value={counts.assets}
              note="Unique assets with findings"
              tone="green"
              change="View assets"
            />
          </section>
          <div className="section-head">
            <div>
              <h2>Risk overview</h2>
              <p>Findings by severity over time</p>
            </div>
            <select
              className="range-select"
              value={range}
              onChange={(e) => setRange(e.target.value)}
              aria-label="Chart date range"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="overview-grid">
            <section className="panel chart-panel">
              <div className="panel-head">
                <div>
                  <strong>Finding activity</strong>
                  <p>Open findings discovered and resolved</p>
                </div>
                <button
                  className="more-button"
                  aria-label="Chart options"
                  onClick={() =>
                    setToast("Chart options are not available in this demo")
                  }
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="chart-legend">
                <span>
                  <i className="legend-square indigo" />
                  Discovered
                </span>
                <span>
                  <i className="legend-square mint" />
                  Resolved
                </span>
                <span className="chart-period">{range}</span>
              </div>
              <div className="chart-wrap">
                <div className="y-labels">
                  <span>20</span>
                  <span>15</span>
                  <span>10</span>
                  <span>5</span>
                  <span>0</span>
                </div>
                <div className="chart">
                  <div className="grid-line" />
                  <div className="grid-line" />
                  <div className="grid-line" />
                  <div className="grid-line" />
                  <div className="grid-line" />
                  <div className="bar-group">
                    <i className="bar discovered" style={{ height: "48%" }} />
                    <i className="bar resolved" style={{ height: "20%" }} />
                    <span>Mon</span>
                  </div>
                  <div className="bar-group">
                    <i className="bar discovered" style={{ height: "72%" }} />
                    <i className="bar resolved" style={{ height: "34%" }} />
                    <span>Tue</span>
                  </div>
                  <div className="bar-group">
                    <i className="bar discovered" style={{ height: "58%" }} />
                    <i className="bar resolved" style={{ height: "42%" }} />
                    <span>Wed</span>
                  </div>
                  <div className="bar-group">
                    <i className="bar discovered" style={{ height: "86%" }} />
                    <i className="bar resolved" style={{ height: "50%" }} />
                    <span>Thu</span>
                  </div>
                  <div className="bar-group">
                    <i className="bar discovered" style={{ height: "54%" }} />
                    <i className="bar resolved" style={{ height: "32%" }} />
                    <span>Fri</span>
                  </div>
                  <div className="bar-group">
                    <i className="bar discovered" style={{ height: "70%" }} />
                    <i className="bar resolved" style={{ height: "58%" }} />
                    <span>Sat</span>
                  </div>
                  <div className="bar-group today">
                    <i className="bar discovered" style={{ height: "38%" }} />
                    <i className="bar resolved" style={{ height: "24%" }} />
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </section>
            <section className="panel severity-panel">
              <div className="panel-head">
                <div>
                  <strong>Severity breakdown</strong>
                  <p>Unresolved findings by priority</p>
                </div>
                <button
                  className="more-button"
                  aria-label="Severity details"
                  onClick={() => setToast("Showing unresolved findings")}
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="donut-area">
                <div
                  className="donut"
                  style={{
                    background: activeItems.length
                      ? `conic-gradient(${severityGradient})`
                      : "#edf0f2",
                  }}
                >
                  <div className="donut-hole">
                    <strong>{activeItems.length}</strong>
                    <span>findings</span>
                  </div>
                </div>
                <div className="severity-legend">
                  <SeverityRow
                    color="critical"
                    label="Critical"
                    count={severityCounts[0]}
                  />
                  <SeverityRow
                    color="high"
                    label="High"
                    count={severityCounts[1]}
                  />
                  <SeverityRow
                    color="medium"
                    label="Medium"
                    count={severityCounts[2]}
                  />
                  <SeverityRow
                    color="low"
                    label="Low"
                    count={severityCounts[3]}
                  />
                </div>
              </div>
              <button
                className="text-link"
                onClick={() =>
                  document
                    .getElementById("findings")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View all findings <ArrowUpRight size={14} />
              </button>
            </section>
          </div>
          <FindingsSection
            filtered={filtered}
            selected={selected}
            setSelected={setSelected}
            query={query}
            setQuery={setQuery}
            severity={severity}
            setSeverity={setSeverity}
            status={status}
            setStatus={setStatus}
            sort={sort}
            setSort={setSort}
            loading={loading}
            error={error}
            reload={reload}
            exportCsv={exportCsv}
            notify={setToast}
          />
          <footer className="footer">
            <span>
              Patchday <span>·</span> Security overview
            </span>
            <span>Demo workspace · Mock data</span>
            <button
              onClick={() => setToast("Feedback link copied to clipboard")}
            >
              Send feedback <ExternalLink size={12} />
            </button>
          </footer>
        </div>
      </main>
      {selected && (
        <FindingDrawer
          selected={selected}
          setSelected={setSelected}
          updateStatus={updateStatus}
          notify={setToast}
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={17} />
          {toast}
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast("")}
          >
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
