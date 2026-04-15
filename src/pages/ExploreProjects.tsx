import React, { useState, useMemo } from 'react';
import ProjectLayout from '../components/layout/ProjectLayout';
import FilterBar from '../components/explore/FilterBar';
import ProjectCard from '../components/explore/ProjectCard';
import TrendingSection from '../components/explore/TrendingSection';
import { useProject } from '../context/ProjectContext';

const statusMap: Record<string, string> = {
  'All': '',
  'Hiring': 'hiring',
  'In Progress': 'in-progress',
  'Completed': 'completed',
};

const ExploreProjects: React.FC = () => {
  const { projects, currentUser } = useProject();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const filtered = useMemo(() => {
    return projects.filter(p => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const match = p.title.toLowerCase().includes(q) ||
          p.pitch.toLowerCase().includes(q) ||
          p.techStack.some(t => t.toLowerCase().includes(q));
        if (!match) return false;
      }
      // Status
      if (selectedStatus !== 'All' && p.status !== statusMap[selectedStatus]) return false;
      // Skills
      if (selectedSkills.length > 0) {
        const hasSkill = selectedSkills.some(s => p.techStack.some(t => t.toLowerCase().includes(s.toLowerCase())));
        if (!hasSkill) return false;
      }
      return true;
    });
  }, [projects, searchQuery, selectedStatus, selectedSkills]);

  // Recommended: projects matching user's skills
  const recommended = useMemo(() => {
    return projects
      .filter(p => p.status === 'hiring')
      .filter(p => p.techStack.some(t => currentUser.skills.some(s => t.toLowerCase().includes(s.toLowerCase()))))
      .slice(0, 4);
  }, [projects, currentUser.skills]);

  return (
    <ProjectLayout title="Explore" breadcrumb="Explore Projects">
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>Explore Projects</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Discover projects hosted by peers, filter by skills, and apply to roles that match your expertise.
        </p>
      </div>

      {/* Trending */}
      <TrendingSection projects={recommended} />

      {/* Filters */}
      <FilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSkills={selectedSkills}
        onSkillToggle={handleSkillToggle}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* Results */}
      <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
        </span>
      </div>

      {filtered.length > 0 ? (
        <div className="project-cards-grid">
          {filtered.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">No projects found</div>
          <div className="empty-state-desc">
            Try adjusting your filters or search query to find more projects.
          </div>
        </div>
      )}
    </ProjectLayout>
  );
};

export default ExploreProjects;
