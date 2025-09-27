import axiosInstance from "../utils/axios";
import type { Task, TaskFormData } from "../types";

export const taskService = {
  // Get all tasks for a project
  getTasks: async (projectId: string, status?: string): Promise<Task[]> => {
    const params = new URLSearchParams();
    if (status && status !== "all") {
      params.append("status", status);
    }

    const queryString = params.toString();
    const url = `/projects/${projectId}/tasks${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await axiosInstance.get(url);
    return response.data.tasks;
  },

  // Get single task by ID
  getTask: async (projectId: string, taskId: string): Promise<Task> => {
    const response = await axiosInstance.get(
      `/projects/${projectId}/tasks/${taskId}`
    );
    return response.data.task;
  },

  // Create new task
  createTask: async (
    projectId: string,
    taskData: TaskFormData
  ): Promise<Task> => {
    const response = await axiosInstance.post(
      `/projects/${projectId}/tasks`,
      taskData
    );
    return response.data.task;
  },

  // Update task
  updateTask: async (
    projectId: string,
    taskId: string,
    taskData: Partial<TaskFormData>
  ): Promise<Task> => {
    const response = await axiosInstance.put(
      `/projects/${projectId}/tasks/${taskId}`,
      taskData
    );
    return response.data.task;
  },

  // Delete task
  deleteTask: async (projectId: string, taskId: string): Promise<void> => {
    await axiosInstance.delete(`/projects/${projectId}/tasks/${taskId}`);
  },
};
