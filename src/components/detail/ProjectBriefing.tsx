import React from 'react';
import { Calendar, Users, Clock, Globe, Star } from 'lucide-react';
import { Project } from '../../types';
import { getUserById, getCohortById } from '../../data/mockData';
import { formatDate, getDaysUntil, getStatusLabel } from '../../utils/helpers';

interface ProjectBriefingProps {
  project: Project;
}

const ProjectBriefing: React.FC<ProjectBriefingProps> = ({ project }) => {
  const host = getUserById(project.hostId);
  const cohort = getCohortById(project.cohortId);
  const daysLeft = getDaysUntil(project.deadline);

  return (
    <div>
      {/* Header */}
      <div className="detail-header">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className={`status-chip ${project.status}`}>
              <span className="dot" />
              {getStatusLabel(project.status)}
            </span>
            {cohort && <span className="badge badge-brand">{cohort.name}</span>}
          </div>
          <h1 className="detail-title">{project.title}</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
            {project.pitch}
          </p>

          <div className="detail-meta">
            <div className="detail-meta-item">
              <Calendar size={15} /> {formatDate(project.createdAt)} — {formatDate(project.deadline)}
            </div>
            <div className="detail-meta-item" style={{ color: daysLeft <= 7 && daysLeft > 0 ? 'var(--color-warning)' : daysLeft <= 0 ? 'var(--color-danger)' : undefined }}>
              <Clock size={15} /> {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
            </div>
            <div className="detail-meta-item">
              <Users size={15} /> {project.currentParticipants}/{project.maxParticipants} members
            </div>
          </div>
        </div>

        {/* Host Card */}
        <div className="card" style={{ minWidth: '220px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '10px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
            Hosted by
          </div>
          <div className="avatar" style={{ width: '52px', height: '52px', margin: '0 auto 10px' }}>
            <img src={host?.avatar} alt={host?.name} />
          </div>
          <div style={{ fontWeight: 700, color: 'var(--text-heading)', fontSize: '0.9rem' }}>{host?.name}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{host?.role}</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '0.78rem' }}>
            <Star size={14} style={{ color: 'var(--color-warning)', fill: 'var(--color-warning)' }} />
            <span style={{ fontWeight: 700, color: 'var(--text-heading)' }}>{host?.reputation}</span>
            <span style={{ color: 'var(--text-muted)' }}>· {host?.completedProjects} projects</span>
          </div>
        </div>
      </div>

      {/* Problem Statement */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Problem Statement</h3>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
          {project.problemStatement}
        </p>
      </div>

      {/* Tech Stack */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '12px' }}>Tech Stack</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.techStack.map(tech => (
            <span key={tech} className="tech-badge" style={{ fontSize: '0.8rem', padding: '6px 14px' }}>{tech}</span>
          ))}
        </div>
      </div>

      {/* Roles */}
      <div className="card">
        <h3 style={{ marginBottom: '12px' }}>Team Roles</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {project.roles.map(role => {
            const assignee = role.assignedUserId ? getUserById(role.assignedUserId) : null;
            return (
              <div key={role.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', background: 'var(--bg-surface-secondary)',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-standard)'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-heading)' }}>
                    {role.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {role.skillsRequired.join(' · ')}
                  </div>
                </div>
                <div>
                  {role.filled && assignee ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="avatar" style={{ width: '26px', height: '26px' }}>
                        <img src={assignee.avatar} alt={assignee.name} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-heading)' }}>{assignee.name}</span>
                      <span className="badge badge-success">Filled</span>
                    </div>
                  ) : (
                    <span className="badge badge-warning">Open</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectBriefing;
