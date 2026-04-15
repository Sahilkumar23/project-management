import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { getApplicationsForUser, getProjectById } from '../../data/mockData';
import { getStatusLabel } from '../../utils/helpers';
import { ApplicationStatus } from '../../types';

const columns: { status: ApplicationStatus; label: string; color: string }[] = [
  { status: 'pending', label: 'Pending', color: 'var(--color-warning)' },
  { status: 'reviewing', label: 'Reviewing', color: 'var(--color-info)' },
  { status: 'shortlisted', label: 'Shortlisted', color: 'var(--brand-primary)' },
  { status: 'hired', label: 'Accepted', color: 'var(--color-success)' },
  { status: 'rejected', label: 'Rejected', color: 'var(--color-danger)' },
];

const ApplicationTracker: React.FC = () => {
  const { currentUserId, applications } = useProject();
  const myApps = applications.filter(a => a.userId === currentUserId);

  return (
    <div>
      <div className="section-header">
        <h2>Application Tracker</h2>
      </div>
      <div className="card">
        <div className="app-tracker-grid">
          {columns.map(col => {
            const items = myApps.filter(a => a.status === col.status);
            return (
              <div key={col.status} className="app-tracker-col">
                <div
                  className="app-tracker-col-header"
                  style={{ borderBottomColor: col.color }}
                >
                  {col.label} ({items.length})
                </div>
                {items.map(app => {
                  const project = getProjectById(app.projectId);
                  const role = project?.roles.find(r => r.id === app.roleId);
                  return (
                    <div key={app.id} className="app-tracker-item">
                      <div className="app-tracker-project">{project?.title}</div>
                      <div className="app-tracker-role">{role?.title}</div>
                    </div>
                  );
                })}
                {items.length === 0 && (
                  <div style={{ padding: '16px', fontSize: '0.78rem', color: 'var(--text-disabled)' }}>
                    No applications
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
