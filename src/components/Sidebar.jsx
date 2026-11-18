import {
  Activity,
  ArrowUpRight,
  ChevronDown,
  Gauge,
  LayoutDashboard,
  MoreHorizontal,
  Settings2,
  Shield,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react";

export function Sidebar({ itemsCount, mobileNav, setMobileNav, notify }) {
  return (
    <>
      <aside className={`sidebar ${mobileNav ? "nav-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Shield size={19} />
          </div>
          <span>patchday</span>
          <span className="brand-beta">BETA</span>
          <button
            className="nav-close"
            onClick={() => setMobileNav(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <div className="workspace-switch">
          <div className="workspace-avatar">N</div>
          <div>
            <strong>Northstar Labs</strong>
            <small>Security workspace</small>
          </div>
          <ChevronDown size={15} />
        </div>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          <button className="nav-item active">
            <LayoutDashboard size={17} />
            Overview
          </button>
          <button
            className="nav-item"
            onClick={() =>
              document
                .getElementById("findings")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <ShieldAlert size={17} />
            Findings<span className="nav-count">{itemsCount}</span>
          </button>
          <button
            className="nav-item"
            onClick={() =>
              notify("Asset inventory is part of the next iteration")
            }
          >
            <Gauge size={17} />
            Assets
          </button>
          <button
            className="nav-item"
            onClick={() => notify("Reports are part of the next iteration")}
          >
            <Activity size={17} />
            Reports
          </button>
        </nav>
        <div className="nav-label nav-label-spaced">MANAGE</div>
        <nav>
          <button
            className="nav-item"
            onClick={() =>
              notify("Team settings are not configured in this demo")
            }
          >
            <Settings2 size={17} />
            Settings
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">
              <Sparkles size={16} />
            </div>
            <strong>Stay ahead of threats</strong>
            <p>Keep your security posture in view, every day.</p>
            <button
              onClick={() =>
                notify("You’re already viewing your security overview")
              }
            >
              Explore insights <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="profile">
            <div className="avatar user-avatar">SG</div>
            <div className="profile-copy">
              <strong>Seema Ghadage</strong>
              <small>Security analyst</small>
            </div>
            <MoreHorizontal size={19} />
          </div>
        </div>
      </aside>
      {mobileNav && (
        <button
          aria-label="Close navigation overlay"
          className="nav-scrim"
          onClick={() => setMobileNav(false)}
        />
      )}
    </>
  );
}
