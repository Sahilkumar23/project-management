import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedSkills: string[];
  onSkillToggle: (skill: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const skills = ['React', 'Node.js', 'Python', 'TypeScript', 'Go', 'Next.js', 'AI/ML', 'DevOps'];
const statuses = ['All', 'Hiring', 'In Progress', 'Completed'];

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSkills,
  onSkillToggle,
  selectedStatus,
  onStatusChange,
}) => {
  return (
    <div>
      <div className="filter-bar">
        <div className="filter-search">
          <Search size={16} className="filter-search-icon" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>

        {statuses.map(status => (
          <button
            key={status}
            className={`filter-chip ${selectedStatus === status ? 'active' : ''}`}
            onClick={() => onStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="filter-bar" style={{ marginTop: '-10px' }}>
        <Filter size={14} style={{ color: 'var(--text-muted)' }} />
        {skills.map(skill => (
          <button
            key={skill}
            className={`filter-chip ${selectedSkills.includes(skill) ? 'active' : ''}`}
            onClick={() => onSkillToggle(skill)}
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
