export type CohortStatus = 'upcoming' | 'active' | 'completed';
export type ProjectStatus = 'hiring' | 'in-progress' | 'completed' | 'archived';
export type ApplicationStatus = 'pending' | 'reviewing' | 'shortlisted' | 'hired' | 'rejected';
export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'revision' | 'done';
export type SubmissionReviewStatus = 'pending' | 'approved' | 'needs-revision';
export type ActivityType = 'task_rejected' | 'new_applicant' | 'deadline' | 'task_submitted' | 'accepted' | 'review_given' | 'milestone_completed' | 'general';

export interface Cohort {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: CohortStatus;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  skills: string[];
  role: string;
  reputation: number;
  completedProjects: number;
  isVerified: boolean;
}

export interface Role {
  id: string;
  title: string;
  description: string;
  skillsRequired: string[];
  filled: boolean;
  assignedUserId?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  assigneeId?: string;
  progress: number;
}

export interface Project {
  id: string;
  title: string;
  pitch: string;
  description: string;
  problemStatement: string;
  techStack: string[];
  cohortId: string;
  hostId: string;
  roles: Role[];
  status: ProjectStatus;
  progress: number;
  milestones: Milestone[];
  createdAt: string;
  deadline: string;
  maxParticipants: number;
  currentParticipants: number;
}

export interface Application {
  id: string;
  userId: string;
  projectId: string;
  roleId: string;
  status: ApplicationStatus;
  resumeUrl: string;
  portfolioUrl?: string;
  coverNote: string;
  appliedAt: string;
}

export interface Feedback {
  id: string;
  submissionId: string;
  authorId: string;
  comment: string;
  type: 'approval' | 'revision' | 'general';
  createdAt: string;
}

export interface Submission {
  id: string;
  taskId: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  description: string;
  submittedAt: string;
  reviewStatus: SubmissionReviewStatus;
  feedback: Feedback[];
  version: number;
}

export interface Task {
  id: string;
  projectId: string;
  assigneeId: string;
  title: string;
  description: string;
  status: TaskStatus;
  submissions: Submission[];
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  detail: string;
  timestamp: string;
  actionUrl: string;
  read: boolean;
  projectId?: string;
}
