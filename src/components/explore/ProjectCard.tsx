import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Star, CheckCircle, Calendar } from 'lucide-react';
import { Project } from '../../types';
import { getUserById, getCohortById } from '../../data/mockData';
import { getDaysUntil } from '../../utils/helpers';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const navigate = useNavigate();
  const host = getUserById(project.hostId);
  const cohort = getCohortById(project.cohortId);
  const openRoles = project.roles.filter(r => !r.filled).length;
  const totalRoles = project.roles.length;
  const filledRoles = totalRoles - openRoles;

  return (
    <div className="project-card" onClick={() => navigate(`/project/${project.id}`)}>
      <div className="project-card-banner" />
      <div className="project-card-body">
        <div className="project-card-header">
          <div>
            <div className="project-card-title">{project.title}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <span className={`badge badge-${project.status === 'hiring' ? 'warning' : project.status === 'completed' ? 'success' : 'info'}`}>
                {project.status === 'hiring' ? '🔥 Hiring' : project.status === 'completed' ? '✅ Completed' : '🚀 In Progress'}
              </span>
              {cohort && (
                <span className="badge badge-neutral" style={{ fontSize: '0.65rem' }}>
                  {cohort.name}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="project-card-pitch">{project.pitch}</p>

        <div className="project-card-tech">
          {project.techStack.map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        {/* Open Roles */}
        {openRoles > 0 && (
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
              Open Roles:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {project.roles.filter(r => !r.filled).map(role => (
                <span key={role.id} className="badge badge-brand">{role.title}</span>
              ))}
            </div>
          </div>
        )}

        <div className="project-card-footer">
          <div className="project-card-host">
            <div className="avatar" style={{ width: '28px', height: '28px' }}>
              <img src={host?.avatar} alt={host?.name} />
            </div>
            <div>
              <div className="project-card-host-name">{host?.name}</div>
              {host?.isVerified && (
                <div className="project-card-host-badge">
                  <CheckCircle size={12} /> Verified
                </div>
              )}
            </div>
          </div>
          <div className="project-card-roles">
            <span>{filledRoles}/{totalRoles}</span> filled
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
