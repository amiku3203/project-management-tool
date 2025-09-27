export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface User {
  id: string;
  email: string;
  token: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  status: "active" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  status: "Active" | "Completed";
}

export interface TaskFormData {
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "done";
  dueDate: string;
}

export interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    limit: number;
  };
  searchQuery: string;
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: "all" | "todo" | "in-progress" | "done";
}
