import React from 'react';
import { Project } from '../../types';
import { getUserById } from '../../data/mockData';
import { CheckCircle, Circle, Loader } from 'lucide-react';

interface MilestoneTrackerProps {
  project: Project;
}

const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({ project }) => {
  const completedCount = project.milestones.filter(m => m.status === 'completed').length;
  const totalCount = project.milestones.length;
  const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div>
      <div className="section-header">
        <h2>Milestone Tracker</h2>
        <span className="badge badge-brand">{completedCount}/{totalCount} completed</span>
      </div>

      {/* Overall Progress */}
      <div className="card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-heading)' }}>Overall Progress</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)' }}>{project.progress}%</span>
        </div>
        <div className="progress-bar-wrapper" style={{ height: '10px' }}>
          <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
        </div>
      </div>

      {/* Milestones */}
      <div className="milestone-tracker">
        {project.milestones.map((milestone, idx) => {
          const assignee = milestone.assigneeId ? getUserById(milestone.assigneeId) : null;

          return (
            <div key={milestone.id} className="milestone-item">
              {/* Status Icon */}
              <div className={`milestone-icon ${milestone.status}`}>
                {milestone.status === 'completed' ? (
                  <CheckCircle size={18} />
                ) : milestone.status === 'in-progress' ? (
                  <Loader size={18} style={{ animation: 'spin 2s linear infinite' }} />
                ) : (
                  <Circle size={18} />
                )}
              </div>

              {/* Info */}
              <div className="milestone-info">
                <div className="milestone-name">{milestone.name}</div>
                <div className="milestone-assignee">
                  {milestone.description}
                  {assignee && ` · ${assignee.name}`}
                </div>
              </div>

              {/* Progress */}
              <div style={{ width: '100px', flexShrink: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {milestone.progress}%
                  </span>
                </div>
                <div className="progress-bar-wrapper" style={{ height: '4px' }}>
                  <div
                    className={`progress-bar-fill ${milestone.status === 'completed' ? 'success' : ''}`}
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneTracker;
