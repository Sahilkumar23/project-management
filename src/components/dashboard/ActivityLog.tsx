import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { formatRelativeTime } from '../../utils/helpers';
import { AlertCircle, UserPlus, Clock, FileText, CheckCircle, Star, MessageSquare, Flag } from 'lucide-react';
import { ActivityType } from '../../types';

const activityIcons: Record<ActivityType, { icon: React.ReactNode; bg: string; color: string }> = {
  task_rejected: { icon: <AlertCircle size={16} />, bg: 'var(--color-danger-bg)', color: 'var(--color-danger)' },
  new_applicant: { icon: <UserPlus size={16} />, bg: 'var(--color-info-bg)', color: 'var(--color-info)' },
  deadline: { icon: <Clock size={16} />, bg: 'var(--color-warning-bg)', color: 'var(--color-warning)' },
  task_submitted: { icon: <FileText size={16} />, bg: 'var(--brand-accent-bg)', color: 'var(--brand-primary)' },
  accepted: { icon: <CheckCircle size={16} />, bg: 'var(--color-success-bg)', color: 'var(--color-success)' },
  review_given: { icon: <MessageSquare size={16} />, bg: 'var(--color-info-bg)', color: 'var(--color-info)' },
  milestone_completed: { icon: <Flag size={16} />, bg: 'var(--color-success-bg)', color: 'var(--color-success)' },
  general: { icon: <Star size={16} />, bg: 'var(--bg-surface-secondary)', color: 'var(--text-muted)' },
};

const ActivityLog: React.FC = () => {
  const { activities, markActivityRead } = useProject();

  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div>
      <div className="section-header">
        <h2>Activity Feed</h2>
        <span className="section-header-link">Mark all read</span>
      </div>
      <div className="card" style={{ padding: '8px' }}>
        <div className="activity-log">
          {sorted.map(activity => {
            const { icon, bg, color } = activityIcons[activity.type];
            return (
              <div
                key={activity.id}
                className={`activity-item ${!activity.read ? 'unread' : ''}`}
                onClick={() => markActivityRead(activity.id)}
              >
                <div
                  className="activity-icon"
                  style={{ background: bg, color }}
                >
                  {icon}
                </div>
                <div className="activity-content">
                  <div
                    className="activity-message"
                    dangerouslySetInnerHTML={{ __html: activity.message }}
                  />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {activity.detail}
                  </div>
                  <div className="activity-time">{formatRelativeTime(activity.timestamp)}</div>
                </div>
                {!activity.read && (
                  <div style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: 'var(--brand-primary)', flexShrink: 0, marginTop: '4px'
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
