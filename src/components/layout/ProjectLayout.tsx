import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface ProjectLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb?: string;
}

const ProjectLayout: React.FC<ProjectLayoutProps> = ({ children, title, breadcrumb }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main-area">
        <TopBar title={title} breadcrumb={breadcrumb} />
        <div className="page-content animate-in">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProjectLayout;
