import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';
import { Project } from '../../types';
import ProjectCard from './ProjectCard';

interface TrendingSectionProps {
  projects: Project[];
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ projects }) => {
  if (projects.length === 0) return null;

  return (
    <div style={{ marginBottom: '28px' }}>
      <div className="section-header">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--brand-primary)' }} />
          Recommended for You
        </h2>
      </div>
      <div className="trending-scroll">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
