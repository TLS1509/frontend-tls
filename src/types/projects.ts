import type { DreyfusLevel } from './learning';

// ─── Enums ──────────────────────────────────────────────────────────────────

export type ProjectType = 'upskilling' | 'stride' | 'custom';
export type ProjectStatus = 'planned' | 'active' | 'completed' | 'archived';
export type TaskStatus = 'not_started' | 'in_progress' | 'submitted' | 'approved' | 'rework';
export type JacStatus = 'pending' | 'approved' | 'rejected' | 'rework_submitted';
export type AssigneeType = 'collaborator' | 'ai_agent' | 'expert';
export type AssignmentRole = 'primary_executor' | 'mentor' | 'reviewer';
export type EnrichmentSource = 'project_task' | 'jac' | 'manual';
export type TemplateStatus = 'draft' | 'active' | 'deprecated';

// ─── Skill requirement (required level per competency) ───────────────────────

export interface SkillRequirement {
  competencyId: string;
  competencyName: string;
  dreyfusLevelRequired: DreyfusLevel;
  count: number; // how many team members need this level
}

// ─── Project ─────────────────────────────────────────────────────────────────

export interface SboProject {
  id: string;
  companyId: string;
  type: ProjectType;
  title: string;
  description: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  expertId: string;
  expertName: string;
  expertInitials: string;
  budget?: number;
  passeportEnrichmentCount: number;
  skillProfile: SkillRequirement[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ─── ProjectTask ─────────────────────────────────────────────────────────────

export interface DeliverableSpec {
  description: string;
  format: string; // 'url' | 'document' | 'code' | 'presentation'
}

export interface SuccessCriteria {
  criterion: string;
  checked: boolean;
}

export interface SboProjectTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  dreyfusLevelRequired: DreyfusLevel;
  competencyIds: string[];
  deliverableSpec: DeliverableSpec;
  successCriteria: SuccessCriteria[];
  assignedTo: string;
  assignedToName: string;
  assignedToInitials: string;
  estimatedHours: number;
  status: TaskStatus;
  dueDate: string;
  submissionDate?: string;
  deliverableUrl?: string;
  submissionNotes?: string;
  expertFeedback?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── JAC (Jalon d'Application Critique) ─────────────────────────────────────

export interface DreyfusRubricScore {
  criterion: string;
  score: DreyfusLevel;
  comment?: string;
}

export interface Jac {
  id: string;
  taskId: string;
  competencyId: string;
  competencyName: string;
  collaboratorId: string;
  collaboratorName: string;
  collaboratorInitials: string;
  expertId: string;
  expertName: string;
  expertInitials: string;
  dreyfusLevelAchieved?: DreyfusLevel;
  status: JacStatus;
  expertFeedback?: string;
  rubricScores?: DreyfusRubricScore[];
  validatedAt?: string;
  createdAt: string;
}

// ─── ProjectAssignment ───────────────────────────────────────────────────────

export interface ProjectAssignment {
  id: string;
  taskId: string;
  assigneeType: AssigneeType;
  assigneeId: string;
  assigneeName: string;
  assigneeInitials: string;
  role: AssignmentRole;
  status: 'assigned' | 'in_progress' | 'completed';
  createdAt: string;
}

// ─── PasseportEnrichment ─────────────────────────────────────────────────────

export interface PasseportEnrichment {
  id: string;
  collaboratorId: string;
  collaboratorName: string;
  collaboratorInitials: string;
  competencyId: string;
  competencyName: string;
  oldDreyfusLevel: DreyfusLevel;
  newDreyfusLevel: DreyfusLevel;
  sourceType: EnrichmentSource;
  sourceId: string;
  projectId: string;
  verifiedBy: string;
  verifiedByName: string;
  verifiedAt: string;
  createdAt: string;
}

// ─── ProjectTemplate ─────────────────────────────────────────────────────────

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  durationWeeksDefault: number;
  durationWeeksMin: number;
  durationWeeksMax: number;
  teamSizeDefault: number;
  teamSizeMin: number;
  teamSizeMax: number;
  skillProfileRequired: SkillRequirement[];
  jacCheckpoints: string[]; // descriptions of JAC checkpoints
  status: TemplateStatus;
  clonedCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Team member (collaborator with Dreyfus levels) ──────────────────────────

export interface ProjectTeamMember {
  userId: string;
  name: string;
  initials: string;
  role: 'collaborateur' | 'manager' | 'expert';
  currentDreyfusLevels: Record<string, DreyfusLevel>; // competencyId → level
  assignedTaskIds: string[];
  jacCount: number;
  jacValidated: number;
}

// ─── Gating result ───────────────────────────────────────────────────────────

export interface GatingCheck {
  competencyId: string;
  competencyName: string;
  required: DreyfusLevel;
  current: DreyfusLevel;
  passed: boolean;
}
