import {
  AlertTriangle,
  ArrowDown,
  ArrowDownUp,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  LockKeyhole,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { IconButton } from "./IconButton.jsx";

export function FindingsSection({
  filtered,
  selected,
  setSelected,
  query,
  setQuery,
  severity,
  setSeverity,
  status,
  setStatus,
  sort,
  setSort,
  loading,
  error,
  reload,
  exportCsv,
  notify,
}) {
  return (
    <section id="findings" className="findings-section">
      <div className="section-head findings-head">
        <div>
          <h2>Priority findings</h2>
          <p>Review and take action on vulnerabilities</p>
        </div>
        <button
          className="view-all"
          onClick={() => {
            setSeverity("All severity");
            setStatus("All statuses");
            setQuery("");
          }}
        >
          View all findings <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="panel table-panel">
        <div className="table-toolbar">
          <div className="search-box">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search findings, assets, CVEs..."
              aria-label="Search findings"
            />
            <kbd>⌘ F</kbd>
            {query && (
              <button
                aria-label="Clear search"
                className="clear-search"
                onClick={() => setQuery("")}
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="toolbar-filters">
            <div className="filter-wrap">
              <SlidersHorizontal size={15} />
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                aria-label="Filter by severity"
              >
                <option>All severity</option>
                {["Critical", "High", "Medium", "Low"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={13} />
            </div>
            <div className="filter-wrap">
              <Filter size={15} />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                aria-label="Filter by status"
              >
                <option>All statuses</option>
                {["Open", "In progress", "Resolved"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <ChevronDown size={13} />
            </div>
            <div className="filter-wrap sort-wrap">
              <ArrowDownUp size={15} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort findings"
              >
                <option>Priority</option>
                <option>Newest</option>
                <option>Asset name</option>
              </select>
              <ChevronDown size={13} />
            </div>
          </div>
        </div>
        {loading ? (
          <div className="loading-state" aria-live="polite">
            <span className="spinner" />
            Loading vulnerability findings...
          </div>
        ) : error ? (
          <div className="empty-state">
            <div className="empty-icon error-icon">
              <AlertTriangle size={20} />
            </div>
            <strong>We couldn’t load findings</strong>
            <p>There was a problem reaching the demo data source.</p>
            <button className="btn btn-quiet" onClick={reload}>
              Try again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <Search size={20} />
            </div>
            <strong>No findings match these filters</strong>
            <p>Try a different search or clear your selected filters.</p>
            <button
              className="btn btn-quiet"
              onClick={() => {
                setQuery("");
                setSeverity("All severity");
                setStatus("All statuses");
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>
                    FINDING <ArrowDown size={12} />
                  </th>
                  <th>ASSET</th>
                  <th>SEVERITY</th>
                  <th>STATUS</th>
                  <th>OWNER</th>
                  <th>AGE</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr
                    key={row.id}
                    className={selected?.id === row.id ? "selected-row" : ""}
                    onClick={() => setSelected(row)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && setSelected(row)}
                  >
                    <td>
                      <div className="finding-cell">
                        <span
                          className={`severity-bar ${row.severity.toLowerCase()}`}
                        />
                        <div>
                          <strong>{row.title}</strong>
                          <small>
                            {row.id} <span>·</span> {row.cve}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="asset-cell">
                        <span className={`asset-icon ${row.color}`}>
                          <LockKeyhole size={14} />
                        </span>
                        <div>
                          <strong>{row.asset}</strong>
                          <small>{row.team}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`severity-pill ${row.severity.toLowerCase()}`}
                      >
                        <i />
                        {row.severity}
                        <span className="score">{row.score.toFixed(1)}</span>
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${row.status.toLowerCase().replace(" ", "-")}`}
                      >
                        <i />
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <span className="owner">
                        <span className={`avatar owner-avatar ${row.color}`}>
                          {row.owner}
                        </span>
                      </span>
                    </td>
                    <td className="age-cell">{row.age} ago</td>
                    <td>
                      <IconButton
                        label={`Open ${row.id} details`}
                        className="row-open"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelected(row);
                        }}
                      >
                        <ChevronRight size={16} />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="table-footer">
          <span>
            Showing{" "}
            <strong>
              {filtered.length ? 1 : 0}–{filtered.length}
            </strong>{" "}
            of <strong>{filtered.length}</strong> findings
          </span>
          <div className="pagination">
            <button aria-label="Previous page" disabled>
              <ChevronLeft size={15} />
            </button>
            <button className="page-current">1</button>
            <button aria-label="Next page" disabled>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
