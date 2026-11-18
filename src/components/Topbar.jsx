import { Bell, ChevronRight, CircleHelp, Menu, Search } from "lucide-react";
import { IconButton } from "./IconButton.jsx";

export function Topbar({ setMobileNav, notify }) {
  return (
    <header className="topbar">
      <div className="crumbs">
        <button
          className="mobile-menu"
          aria-label="Open navigation"
          onClick={() => setMobileNav(true)}
        >
          <Menu size={20} />
        </button>
        <span>Workspace</span>
        <ChevronRight size={14} />
        <strong>Overview</strong>
      </div>
      <div className="top-actions">
        <div className="search-global">
          <Search size={15} />
          <span>Quick search</span>
          <kbd>⌘ K</kbd>
        </div>
        <IconButton
          label="Help center"
          onClick={() => notify("Help center is coming soon")}
        >
          <CircleHelp size={18} />
        </IconButton>
        <IconButton
          label="Notifications"
          className="bell-btn"
          onClick={() => notify("You’re all caught up")}
        >
          <Bell size={18} />
          <i />
        </IconButton>
        <div className="avatar top-avatar">SG</div>
      </div>
    </header>
  );
}
