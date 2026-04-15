import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Compass, FolderKanban, PlusCircle, Settings, LogOut } from 'lucide-react';
import { useProject } from '../../context/ProjectContext';
import { getInitials } from '../../utils/helpers';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, unreadCount } = useProject();

  const mainNav = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/project', exact: true },
    { name: 'Explore', icon: <Compass size={20} />, path: '/project/explore' },
    { name: 'My Projects', icon: <FolderKanban size={20} />, path: '/project/my-projects' },
  ];

  const actionNav = [
    { name: 'Host a Project', icon: <PlusCircle size={20} />, path: '/project/create' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="pm-sidebar" id="pm-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-mini">PM</span>
        <span className="sidebar-logo-full">
          <span className="brand">Peer</span>Learning
        </span>
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>
        {mainNav.map(item => (
          <div
            key={item.name}
            className={`sidebar-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            title={item.name}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span className="sidebar-link-text">{item.name}</span>
            {item.name === 'Dashboard' && unreadCount > 0 && (
              <span className="sidebar-badge">{unreadCount}</span>
            )}
          </div>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: '8px' }}>Actions</div>
        {actionNav.map(item => (
          <div
            key={item.name}
            className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            title={item.name}
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span className="sidebar-link-text">{item.name}</span>
          </div>
        ))}

        <div style={{ flex: 1 }} />

        <div className="sidebar-link" title="Settings">
          <span className="sidebar-link-icon"><Settings size={20} /></span>
          <span className="sidebar-link-text">Settings</span>
        </div>
        <div className="sidebar-link" title="Log Out">
          <span className="sidebar-link-icon"><LogOut size={20} /></span>
          <span className="sidebar-link-text">Log Out</span>
        </div>
      </div>

      {/* Profile */}
      <div className="sidebar-profile">
        <div className="sidebar-profile-avatar">
          {getInitials(currentUser.name)}
        </div>
        <div className="sidebar-profile-info">
          <div className="sidebar-profile-name">{currentUser.name}</div>
          <div className="sidebar-profile-role">{currentUser.role}</div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
