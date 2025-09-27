 import axiosInstance from '../utils/axios';
import type { Project, ProjectFormData } from '../types';

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    limit: number;
  };
}

export const projectService = {
  // Get all projects with pagination and search
  getProjects: async (page: number = 1, limit: number = 10, search: string = ''): Promise<ProjectsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (search) {
      params.append('search', search);
    }
    
    const response = await axiosInstance.get(`/projects?${params.toString()}`);
    return response.data;
  },

  // Get single project by ID
  getProject: async (id: string): Promise<Project> => {
    const response = await axiosInstance.get(`/projects/${id}`);
    return response.data.project;
  },

  // Create new project
  createProject: async (projectData: ProjectFormData): Promise<Project> => {
    const response = await axiosInstance.post('/projects', projectData);
    return response.data.project;
  },

  // Update project
  updateProject: async (id: string, projectData: Partial<ProjectFormData>): Promise<Project> => {
    const response = await axiosInstance.put(`/projects/${id}`, projectData);
    return response.data.project;
  },

  // Delete project
  deleteProject: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/projects/${id}`);
  },
};
