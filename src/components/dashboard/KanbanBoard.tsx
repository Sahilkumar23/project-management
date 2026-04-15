import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { getTasksForUser, getProjectById, getUserById } from '../../data/mockData';
import { TaskStatus } from '../../types';
import { Calendar, User } from 'lucide-react';
import { formatDate, getDaysUntil } from '../../utils/helpers';

interface KanbanColumn {
  status: TaskStatus;
  label: string;
  color: string;
}

const kanbanColumns: KanbanColumn[] = [
  { status: 'todo', label: 'To Do', color: 'var(--text-muted)' },
  { status: 'in-progress', label: 'In Progress', color: 'var(--color-info)' },
  { status: 'in-review', label: 'In Review', color: 'var(--color-warning)' },
  { status: 'done', label: 'Done', color: 'var(--color-success)' },
];

const KanbanBoard: React.FC = () => {
  const { currentUserId, tasks } = useProject();
  const myTasks = tasks.filter(t => t.assigneeId === currentUserId);

  return (
    <div>
      <div className="section-header">
        <h2>My Tasks</h2>
      </div>
      <div className="kanban-board">
        {kanbanColumns.map(col => {
          const colTasks = myTasks.filter(t => {
            if (col.status === 'in-review') return t.status === 'in-review' || t.status === 'revision';
            return t.status === col.status;
          });

          return (
            <div key={col.status} className="kanban-column">
              <div className="kanban-column-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.color }} />
                  <span className="kanban-column-title">{col.label}</span>
                </div>
                <span className="kanban-column-count">{colTasks.length}</span>
              </div>
              <div className="kanban-cards">
                {colTasks.map(task => {
                  const project = getProjectById(task.projectId);
                  const daysLeft = getDaysUntil(task.dueDate);

                  return (
                    <div key={task.id} className="kanban-card">
                      <div className="kanban-card-title">{task.title}</div>
                      <div className="kanban-card-project">{project?.title}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                        <span className={`badge badge-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'neutral'}`}>
                          {task.priority}
                        </span>
                        {task.status === 'revision' && (
                          <span className="badge badge-warning">Needs Revision</span>
                        )}
                      </div>
                      <div className="kanban-card-footer">
                        <div className="kanban-card-due" style={{ color: daysLeft <= 3 ? 'var(--color-danger)' : undefined }}>
                          <Calendar size={12} />
                          {daysLeft > 0 ? `${daysLeft}d left` : daysLeft === 0 ? 'Due today' : 'Overdue'}
                        </div>
                        {task.submissions.length > 0 && (
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            v{task.submissions.length}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
                {colTasks.length === 0 && (
                  <div style={{ padding: '20px', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-disabled)' }}>
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanBoard;
