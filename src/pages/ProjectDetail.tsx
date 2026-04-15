import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectLayout from '../components/layout/ProjectLayout';
import ProjectBriefing from '../components/detail/ProjectBriefing';
import ApplicationPanel from '../components/detail/ApplicationPanel';
import ShortlistDashboard from '../components/detail/ShortlistDashboard';
import TaskBoard from '../components/detail/TaskBoard';
import ReviewFeedback from '../components/detail/ReviewFeedback';
import MilestoneTracker from '../components/detail/MilestoneTracker';
import { useProject } from '../context/ProjectContext';
import { ArrowLeft } from 'lucide-react';

type DetailTab = 'overview' | 'hiring' | 'tasks' | 'reviews' | 'milestones';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects, currentUserId } = useProject();

  const project = projects.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  if (!project) {
    return (
      <ProjectLayout title="Not Found">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <div className="empty-state-title">Project not found</div>
          <div className="empty-state-desc">
            The project you're looking for doesn't exist or has been removed.
          </div>
          <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/project')}>
            Go to Dashboard
          </button>
        </div>
      </ProjectLayout>
    );
  }

  const isHost = project.hostId === currentUserId;
  const isParticipant = project.roles.some(r => r.assignedUserId === currentUserId);

  const tabs: { key: DetailTab; label: string; show: boolean }[] = [
    { key: 'overview', label: 'Overview', show: true },
    { key: 'hiring', label: 'Hiring Pipeline', show: isHost && (project.status === 'hiring' || project.status === 'in-progress') },
    { key: 'tasks', label: 'Tasks', show: project.status === 'in-progress' || project.status === 'completed' },
    { key: 'reviews', label: 'Reviews', show: project.status === 'in-progress' || project.status === 'completed' },
    { key: 'milestones', label: 'Milestones', show: true },
  ];

  return (
    <ProjectLayout title={project.title} breadcrumb={project.title}>
      {/* Back */}
      <div
        onClick={() => navigate(-1)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '0.82rem', color: 'var(--text-muted)', cursor: 'pointer',
          marginBottom: '16px', transition: 'color 0.15s'
        }}
      >
        <ArrowLeft size={16} /> Back
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        {tabs.filter(t => t.show).map(tab => (
          <button
            key={tab.key}
            className={`detail-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          <ProjectBriefing project={project} />
          {!isHost && !isParticipant && project.status === 'hiring' && (
            <ApplicationPanel project={project} />
          )}
        </div>
      )}

      {activeTab === 'hiring' && isHost && (
        <ShortlistDashboard projectId={project.id} />
      )}

      {activeTab === 'tasks' && (
        <TaskBoard projectId={project.id} />
      )}

      {activeTab === 'reviews' && (
        <ReviewFeedback projectId={project.id} isHost={isHost} />
      )}

      {activeTab === 'milestones' && (
        <MilestoneTracker project={project} />
      )}
    </ProjectLayout>
  );
};

export default ProjectDetail;
