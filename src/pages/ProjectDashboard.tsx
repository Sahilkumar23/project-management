import React from 'react';
import ProjectLayout from '../components/layout/ProjectLayout';
import ActiveCohorts from '../components/dashboard/ActiveCohorts';
import HostWorkspace from '../components/dashboard/HostWorkspace';
import ActivityLog from '../components/dashboard/ActivityLog';
import ApplicationTracker from '../components/dashboard/ApplicationTracker';
import KanbanBoard from '../components/dashboard/KanbanBoard';
import { useProject } from '../context/ProjectContext';
import { FolderKanban, ClipboardCheck, Users, Briefcase } from 'lucide-react';
import { getHostedProjects, getEnrolledProjects, getTasksForUser } from '../data/mockData';

const ProjectDashboard: React.FC = () => {
  const { currentUserId, currentUser, tasks, applications } = useProject();

  const hosted = getHostedProjects(currentUserId);
  const enrolled = getEnrolledProjects(currentUserId);
  const myTasks = tasks.filter(t => t.assigneeId === currentUserId);
  const myApps = applications.filter(a => a.userId === currentUserId);
  const activeTasks = myTasks.filter(t => t.status !== 'done').length;
  const pendingReviews = myTasks.filter(t => t.status === 'in-review').length;

  return (
    <ProjectLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h1>Welcome back, {currentUser.name.split(' ')[0]}! 👋</h1>
        <p>Here's an overview of your project activities and tasks.</p>
        <div className="welcome-banner-stats">
          <div className="welcome-stat">
            <div className="welcome-stat-value">{hosted.length}</div>
            <div className="welcome-stat-label">Hosted Projects</div>
          </div>
          <div className="welcome-stat">
            <div className="welcome-stat-value">{enrolled.length}</div>
            <div className="welcome-stat-label">Enrolled In</div>
          </div>
          <div className="welcome-stat">
            <div className="welcome-stat-value">{activeTasks}</div>
            <div className="welcome-stat-label">Active Tasks</div>
          </div>
          <div className="welcome-stat">
            <div className="welcome-stat-value">{pendingReviews}</div>
            <div className="welcome-stat-label">Pending Reviews</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon brand"><FolderKanban size={22} /></div>
          <div className="stat-card-content">
            <h4>{hosted.length + enrolled.length}</h4>
            <p>Total Projects</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon success"><ClipboardCheck size={22} /></div>
          <div className="stat-card-content">
            <h4>{myTasks.filter(t => t.status === 'done').length}</h4>
            <p>Completed Tasks</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon warning"><Briefcase size={22} /></div>
          <div className="stat-card-content">
            <h4>{myApps.length}</h4>
            <p>Applications Sent</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon info"><Users size={22} /></div>
          <div className="stat-card-content">
            <h4>{hosted.reduce((sum, p) => sum + p.currentParticipants, 0)}</h4>
            <p>Team Members</p>
          </div>
        </div>
      </div>

      {/* Active Projects */}
      <ActiveCohorts />

      {/* Host Workspace */}
      <HostWorkspace />

      {/* Two Column: Activity + Tracker */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px' }}>
        <ActivityLog />
        <ApplicationTracker />
      </div>

      {/* Kanban Board */}
      <KanbanBoard />
    </ProjectLayout>
  );
};

export default ProjectDashboard;
