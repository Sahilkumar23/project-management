import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { getUserById } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';
import { Task, Submission } from '../../types';
import { ExternalLink, CheckCircle, AlertTriangle, Clock, MessageSquare } from 'lucide-react';
import SubmissionGateway from './SubmissionGateway';

interface ReviewFeedbackProps {
  projectId: string;
  isHost: boolean;
}

const ReviewFeedback: React.FC<ReviewFeedbackProps> = ({ projectId, isHost }) => {
  const { tasks } = useProject();
  const projectTasks = tasks.filter(t => t.projectId === projectId && t.submissions.length > 0);

  if (projectTasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <div className="empty-state-title">No Submissions Yet</div>
        <div className="empty-state-desc">
          Tasks haven't been submitted for review yet. Check back later.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">
        <h2>Submissions & Reviews</h2>
      </div>

      {projectTasks.map(task => (
        <div key={task.id} style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {task.title}
            {task.status !== 'done' && !isHost && (
              <SubmissionGateway taskId={task.id} taskTitle={task.title} />
            )}
          </h4>

          {task.submissions
            .sort((a, b) => b.version - a.version)
            .map(sub => {
              const submitter = getUserById(sub.userId);
              return (
                <div key={sub.id} className="submission-card">
                  <div className="submission-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="avatar" style={{ width: '28px', height: '28px' }}>
                        <img src={submitter?.avatar} alt={submitter?.name} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-heading)' }}>
                          {submitter?.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          v{sub.version} — {formatDate(sub.submittedAt)}
                        </div>
                      </div>
                    </div>
                    <span className={`status-chip ${sub.reviewStatus === 'approved' ? 'approved' : sub.reviewStatus === 'needs-revision' ? 'revision' : 'pending'}`}>
                      <span className="dot" />
                      {sub.reviewStatus === 'approved' ? 'Approved' : sub.reviewStatus === 'needs-revision' ? 'Needs Revision' : 'Pending Review'}
                    </span>
                  </div>

                  {/* Submission File */}
                  <div className="submission-file">
                    <ExternalLink size={16} style={{ color: 'var(--brand-primary)' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-heading)' }}>{sub.fileName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sub.description}</div>
                    </div>
                  </div>

                  {/* Feedback */}
                  {sub.feedback.length > 0 && (
                    <div className="feedback-list">
                      {sub.feedback.map(fb => {
                        const author = getUserById(fb.authorId);
                        return (
                          <div key={fb.id} className={`feedback-item ${fb.type === 'revision' ? 'revision' : ''}`}>
                            <div className="feedback-author">
                              <MessageSquare size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                              {author?.name}
                              {fb.type === 'approval' && (
                                <CheckCircle size={12} style={{ color: 'var(--color-success)', marginLeft: '6px', verticalAlign: 'middle' }} />
                              )}
                              {fb.type === 'revision' && (
                                <AlertTriangle size={12} style={{ color: 'var(--color-warning)', marginLeft: '6px', verticalAlign: 'middle' }} />
                              )}
                            </div>
                            <div className="feedback-text">{fb.comment}</div>
                            <div className="feedback-time">{formatDate(fb.createdAt)}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Host Actions */}
                  {isHost && sub.reviewStatus === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px', justifyContent: 'flex-end' }}>
                      <button className="btn btn-sm btn-secondary">
                        <AlertTriangle size={14} /> Request Revision
                      </button>
                      <button className="btn btn-sm btn-success">
                        <CheckCircle size={14} /> Approve
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default ReviewFeedback;
