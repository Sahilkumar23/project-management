import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { getCohortById, getEnrolledProjects, getHostedProjects } from '../../data/mockData';
import { formatDate, getDaysUntil } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, ArrowRight } from 'lucide-react';

const ActiveCohorts: React.FC = () => {
  const { currentUserId } = useProject();
  const navigate = useNavigate();

  const enrolled = getEnrolledProjects(currentUserId);
  const hosted = getHostedProjects(currentUserId);
  const allProjects = [...hosted, ...enrolled].filter(p => p.status !== 'completed' && p.status !== 'archived');

  return (
    <div>
      <div className="section-header">
        <h2>Active Projects</h2>
        <span className="section-header-link" onClick={() => navigate('/project/explore')}>
          View All <ArrowRight size={14} style={{ verticalAlign: 'middle' }} />
        </span>
      </div>
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {allProjects.map(project => {
          const cohort = getCohortById(project.cohortId);
          const daysLeft = getDaysUntil(project.deadline);
          const isHost = project.hostId === currentUserId;

          return (
            <div
              key={project.id}
              className="card card-interactive"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span className={`badge badge-${project.status === 'hiring' ? 'warning' : 'info'}`}>
                  {isHost ? '👑 Host' : '👤 Participant'}
                </span>
                <span className={`status-chip ${project.status}`}>
                  <span className="dot" />
                  {project.status === 'hiring' ? 'Hiring' : 'In Progress'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', marginBottom: '6px' }}>{project.title}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {cohort?.name}
              </p>

              {/* Progress */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Progress</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-heading)' }}>{project.progress}%</span>
                </div>
                <div className="progress-bar-wrapper">
                  <div className="progress-bar-fill" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <Users size={14} />
                  {project.currentParticipants}/{project.maxParticipants} members
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: daysLeft <= 7 ? 'var(--color-danger)' : 'var(--text-muted)' }}>
                  <Calendar size={14} />
                  {daysLeft > 0 ? `${daysLeft}d left` : 'Overdue'}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveCohorts;
