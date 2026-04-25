/**
 * Collaboration Plugin API (tls-projet-collaboratif)
 * Handles collaborative projects, team management, and shared work
 */

import { restClient } from '../restClient';

interface CollaborativeProject {
  id: number;
  title: string;
  description: string;
  owner_id: number;
  status: 'planning' | 'active' | 'completed' | 'archived';
  members: ProjectMember[];
  created_at: string;
  deadline?: string;
}

interface ProjectMember {
  user_id: number;
  name: string;
  email: string;
  role: 'owner' | 'contributor' | 'viewer';
  joined_at: string;
}

interface ProjectTask {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  assigned_to: number;
  status: 'todo' | 'in-progress' | 'completed';
  due_date?: string;
  created_at: string;
}

interface ProjectComment {
  id: number;
  task_id?: number;
  project_id: number;
  author_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export const collaborationAPI = {
  /**
   * Get user's collaborative projects
   */
  getProjects: async (): Promise<CollaborativeProject[]> => {
    return restClient.get('/tls/v1/collaboration/projects');
  },

  /**
   * Get single project
   */
  getProject: async (projectId: number): Promise<CollaborativeProject> => {
    return restClient.get(`/tls/v1/collaboration/projects/${projectId}`);
  },

  /**
   * Create new project
   */
  createProject: async (data: { title: string; description: string; deadline?: string }): Promise<CollaborativeProject> => {
    return restClient.post('/tls/v1/collaboration/projects', data);
  },

  /**
   * Update project
   */
  updateProject: async (projectId: number, data: Partial<CollaborativeProject>): Promise<CollaborativeProject> => {
    return restClient.put(`/tls/v1/collaboration/projects/${projectId}`, data);
  },

  /**
   * Get project members
   */
  getProjectMembers: async (projectId: number): Promise<ProjectMember[]> => {
    return restClient.get(`/tls/v1/collaboration/projects/${projectId}/members`);
  },

  /**
   * Add member to project
   */
  addProjectMember: async (projectId: number, userId: number, role?: string): Promise<ProjectMember> => {
    return restClient.post(`/tls/v1/collaboration/projects/${projectId}/members`, { user_id: userId, role });
  },

  /**
   * Remove member from project
   */
  removeProjectMember: async (projectId: number, userId: number): Promise<{ success: boolean }> => {
    return restClient.delete(`/tls/v1/collaboration/projects/${projectId}/members/${userId}`);
  },

  /**
   * Get project tasks
   */
  getProjectTasks: async (projectId: number): Promise<ProjectTask[]> => {
    return restClient.get(`/tls/v1/collaboration/projects/${projectId}/tasks`);
  },

  /**
   * Create project task
   */
  createTask: async (projectId: number, data: { title: string; assigned_to: number; due_date?: string }): Promise<ProjectTask> => {
    return restClient.post(`/tls/v1/collaboration/projects/${projectId}/tasks`, data);
  },

  /**
   * Update task
   */
  updateTask: async (projectId: number, taskId: number, data: Partial<ProjectTask>): Promise<ProjectTask> => {
    return restClient.put(`/tls/v1/collaboration/projects/${projectId}/tasks/${taskId}`, data);
  },

  /**
   * Delete task
   */
  deleteTask: async (projectId: number, taskId: number): Promise<{ success: boolean }> => {
    return restClient.delete(`/tls/v1/collaboration/projects/${projectId}/tasks/${taskId}`);
  },

  /**
   * Get project comments/activity
   */
  getProjectComments: async (projectId: number): Promise<ProjectComment[]> => {
    return restClient.get(`/tls/v1/collaboration/projects/${projectId}/comments`);
  },

  /**
   * Add comment to project
   */
  addComment: async (projectId: number, content: string, taskId?: number): Promise<ProjectComment> => {
    return restClient.post(`/tls/v1/collaboration/projects/${projectId}/comments`, { content, task_id: taskId });
  },
};
