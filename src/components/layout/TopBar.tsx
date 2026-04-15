import React from 'react';
import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProject } from '../../context/ProjectContext';

interface TopBarProps {
  title: string;
  breadcrumb?: string;
}

const TopBar: React.FC<TopBarProps> = ({ title, breadcrumb }) => {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useProject();

  return (
    <header className="pm-topbar" id="pm-topbar">
      <div className="topbar-left">
        <div className="topbar-breadcrumb">
          Projects {breadcrumb && <>/ <span>{breadcrumb}</span></>}
          {!breadcrumb && <> / <span>{title}</span></>}
        </div>
      </div>

      <div className="topbar-search">
        <Search size={16} className="topbar-search-icon" />
        <input type="text" placeholder="Search projects, tasks, people..." />
      </div>

      <div className="topbar-right">
        <button className="topbar-theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="topbar-icon-btn" title="Notifications">
          <Bell size={18} />
          {unreadCount > 0 && <span className="badge-dot" />}
        </button>
      </div>
    </header>
  );
};

export default TopBar;
