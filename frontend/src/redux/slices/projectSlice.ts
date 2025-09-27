 import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { ProjectsState,   ProjectFormData } from '../../types';
import { projectService } from '../../services/projectServices';
 

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProjects: 0,
    limit: 6,
  },
  searchQuery: '',
};

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async ({ page, limit, search }: { page: number; limit: number; search: string }) => {
    const response = await projectService.getProjects(page, limit, search);
    return response;
  }
);

export const fetchProject = createAsyncThunk(
  'projects/fetchProject',
  async (id: string) => {
    const project = await projectService.getProject(id);
    return project;
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData: ProjectFormData) => {
    const project = await projectService.createProject(projectData);
    return project;
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, projectData }: { id: string; projectData: Partial<ProjectFormData> }) => {
    const project = await projectService.updateProject(id, projectData);
    return project;
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id: string) => {
    await projectService.deleteProject(id);
    return id;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      })
      
      // Fetch single project
      .addCase(fetchProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch project';
      })
      
      // Create project
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.unshift(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create project';
      })
      
      // Update project
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject && state.currentProject._id === action.payload._id) {
          state.currentProject = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update project';
      })
      
      // Delete project
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(p => p._id !== action.payload);
        if (state.currentProject && state.currentProject._id === action.payload) {
          state.currentProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete project';
      });
  },
});

export const { setSearchQuery, clearCurrentProject, clearError } = projectSlice.actions;
export default projectSlice.reducer;
