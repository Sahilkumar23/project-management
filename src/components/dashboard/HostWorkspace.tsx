import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { getHostedProjects, getApplicationsForProject, getTasksForProject } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Users, FileCheck, AlertTriangle, ArrowRight } from 'lucide-react';

const HostWorkspace: React.FC = () => {
  const { currentUserId, applications } = useProject();
  const navigate = useNavigate();
  const hostedProjects = getHostedProjects(currentUserId);

  if (hostedProjects.length === 0) return null;

  return (
    <div>
      <div className="section-header">
        <h2>🏠 Host Workspace</h2>
      </div>
      <div className="host-workspace-grid">
        {hostedProjects.map(project => {
          const projectApps = applications.filter(a => a.projectId === project.id);
          const pendingApps = projectApps.filter(a => a.status === 'pending' || a.status === 'reviewing').length;
          const projectTasks = getTasksForProject(project.id);
          const tasksInReview = projectTasks.filter(t => t.status === 'in-review').length;
          const tasksRevision = projectTasks.filter(t => t.status === 'revision').length;

          return (
            <div
              key={project.id}
              className="host-project-card card-interactive"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div className="host-project-title">{project.title}</div>

              <div className="host-project-stats">
                <div className="host-project-stat">
                  <div className="host-project-stat-value" style={{ color: pendingApps > 0 ? 'var(--color-warning)' : 'var(--text-heading)' }}>
                    {pendingApps}
                  </div>
                  <div className="host-project-stat-label">Pending Apps</div>
                </div>
                <div className="host-project-stat">
                  <div className="host-project-stat-value" style={{ color: tasksInReview > 0 ? 'var(--color-info)' : 'var(--text-heading)' }}>
                    {tasksInReview}
                  </div>
                  <div className="host-project-stat-label">To Review</div>
                </div>
                <div className="host-project-stat">
                  <div className="host-project-stat-value" style={{ color: tasksRevision > 0 ? 'var(--color-danger)' : 'var(--text-heading)' }}>
                    {tasksRevision}
                  </div>
                  <div className="host-project-stat-label">Revisions</div>
                </div>
              </div>

              {/* Project Health Progress */}
              <div style={{ marginTop: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Project Health</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700 }}>{project.progress}%</span>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HostWorkspace;
