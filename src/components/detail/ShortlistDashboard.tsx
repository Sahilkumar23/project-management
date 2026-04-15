import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { getUserById } from '../../data/mockData';
import { Application, ApplicationStatus } from '../../types';
import { Check, X, Eye, Star } from 'lucide-react';
import { formatDate } from '../../utils/helpers';

interface ShortlistDashboardProps {
  projectId: string;
}

const pipelineStages: { status: ApplicationStatus; label: string; color: string }[] = [
  { status: 'reviewing', label: 'Reviewing', color: 'var(--color-info)' },
  { status: 'shortlisted', label: 'Shortlisted', color: 'var(--brand-primary)' },
  { status: 'hired', label: 'Hired', color: 'var(--color-success)' },
];

const ShortlistDashboard: React.FC<ShortlistDashboardProps> = ({ projectId }) => {
  const { applications, updateApplicationStatus, projects } = useProject();
  const project = projects.find(p => p.id === projectId);
  const projectApps = applications.filter(a => a.projectId === projectId);

  // Include pending in reviewing
  const getAppsForStage = (status: ApplicationStatus) => {
    if (status === 'reviewing') {
      return projectApps.filter(a => a.status === 'pending' || a.status === 'reviewing');
    }
    return projectApps.filter(a => a.status === status);
  };

  const rejected = projectApps.filter(a => a.status === 'rejected');

  return (
    <div>
      <div className="section-header">
        <h2>Applicant Pipeline</h2>
        <span className="badge badge-neutral">{projectApps.length} total</span>
      </div>

      <div className="pipeline-board">
        {pipelineStages.map(stage => {
          const apps = getAppsForStage(stage.status);
          return (
            <div key={stage.status} className="pipeline-column">
              <div className="pipeline-column-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: stage.color }} />
                  <span className="kanban-column-title">{stage.label}</span>
                </div>
                <span className="kanban-column-count">{apps.length}</span>
              </div>

              {apps.map(app => {
                const user = getUserById(app.userId);
                const role = project?.roles.find(r => r.id === app.roleId);
                return (
                  <div key={app.id} className="pipeline-card">
                    <div className="pipeline-card-user">
                      <div className="avatar" style={{ width: '32px', height: '32px' }}>
                        <img src={user?.avatar} alt={user?.name} />
                      </div>
                      <div>
                        <div className="pipeline-card-name">{user?.name}</div>
                        <div className="pipeline-card-role">for {role?.title}</div>
                      </div>
                    </div>

                    <div className="pipeline-card-skills">
                      {user?.skills.slice(0, 3).map(s => (
                        <span key={s} className="tech-badge" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>{s}</span>
                      ))}
                    </div>

                    {user && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px', fontSize: '0.72rem' }}>
                        <Star size={12} style={{ color: 'var(--color-warning)', fill: 'var(--color-warning)' }} />
                        <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{user.reputation}</span>
                        <span style={{ color: 'var(--text-muted)' }}>· {user.completedProjects} projects</span>
                      </div>
                    )}

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '10px', fontStyle: 'italic' }}>
                      "{app.coverNote.slice(0, 80)}..."
                    </div>

                    <div className="pipeline-card-actions">
                      {stage.status === 'reviewing' && (
                        <>
                          <button className="btn btn-sm btn-primary" onClick={() => updateApplicationStatus(app.id, 'shortlisted')}>
                            Shortlist
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => updateApplicationStatus(app.id, 'rejected')}>
                            <X size={14} />
                          </button>
                        </>
                      )}
                      {stage.status === 'shortlisted' && (
                        <>
                          <button className="btn btn-sm btn-success" onClick={() => updateApplicationStatus(app.id, 'hired')}>
                            <Check size={14} /> Hire
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => updateApplicationStatus(app.id, 'rejected')}>
                            <X size={14} />
                          </button>
                        </>
                      )}
                      {stage.status === 'hired' && (
                        <span className="badge badge-success">✓ Onboarded</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {apps.length === 0 && (
                <div style={{ padding: '24px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-disabled)' }}>
                  No applicants
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rejected */}
      {rejected.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <details>
            <summary style={{ cursor: 'pointer', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Rejected ({rejected.length})
            </summary>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {rejected.map(app => {
                const user = getUserById(app.userId);
                return (
                  <div key={app.id} className="badge badge-danger" style={{ padding: '6px 12px' }}>
                    {user?.name}
                  </div>
                );
              })}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default ShortlistDashboard;
