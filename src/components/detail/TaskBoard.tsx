import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { getUserById } from '../../data/mockData';
import { getStatusLabel, getDaysUntil, formatDate } from '../../utils/helpers';
import { Task } from '../../types';
import { Calendar, User, AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react';

interface TaskBoardProps {
  projectId: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ projectId }) => {
  const { tasks } = useProject();
  const projectTasks = tasks.filter(t => t.projectId === projectId);

  return (
    <div>
      <div className="section-header">
        <h2>Tasks & Components</h2>
        <span className="badge badge-neutral">{projectTasks.length} tasks</span>
      </div>

      <div className="task-list">
        {projectTasks.map(task => {
          const assignee = getUserById(task.assigneeId);
          const daysLeft = getDaysUntil(task.dueDate);

          return (
            <div key={task.id} className="task-item">
              {/* Status Icon */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: task.status === 'done' ? 'var(--color-success-bg)' :
                  task.status === 'in-review' ? 'var(--color-warning-bg)' :
                    task.status === 'revision' ? 'var(--color-danger-bg)' :
                      task.status === 'in-progress' ? 'var(--color-info-bg)' : 'var(--bg-surface-secondary)',
                color: task.status === 'done' ? 'var(--color-success)' :
                  task.status === 'in-review' ? 'var(--color-warning)' :
                    task.status === 'revision' ? 'var(--color-danger)' :
                      task.status === 'in-progress' ? 'var(--color-info)' : 'var(--text-disabled)',
                flexShrink: 0
              }}>
                {task.status === 'done' ? <CheckCircle size={18} /> :
                  task.status === 'revision' ? <AlertTriangle size={18} /> :
                    task.status === 'in-review' ? <Clock size={18} /> :
                      <FileText size={18} />}
              </div>

              {/* Content */}
              <div className="task-item-content">
                <div className="task-item-title">{task.title}</div>
                <div className="task-item-desc">{task.description}</div>
              </div>

              {/* Right Side */}
              <div className="task-item-right">
                <span className={`badge badge-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'neutral'}`}>
                  {task.priority}
                </span>
                <span className={`status-chip ${task.status}`}>
                  <span className="dot" />
                  {getStatusLabel(task.status)}
                </span>
                {assignee && (
                  <div className="avatar" style={{ width: '28px', height: '28px' }} title={assignee.name}>
                    <img src={assignee.avatar} alt={assignee.name} />
                  </div>
                )}
                <span style={{ fontSize: '0.72rem', color: daysLeft <= 3 && daysLeft > 0 ? 'var(--color-warning)' : daysLeft <= 0 ? 'var(--color-danger)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {formatDate(task.dueDate)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;
