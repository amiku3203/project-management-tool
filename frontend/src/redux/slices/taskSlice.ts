  import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { TasksState, TaskFormData } from '../../types';
import { taskService } from '../../services/taskServices';
 

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async ({ projectId, status }: { projectId: string; status?: string }) => {
    const tasks = await taskService.getTasks(projectId, status);
    return tasks;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ projectId, taskData }: { projectId: string; taskData: TaskFormData }) => {
    const task = await taskService.createTask(projectId, taskData);
    return task;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ projectId, taskId, taskData }: { projectId: string; taskId: string; taskData: Partial<TaskFormData> }) => {
    const task = await taskService.updateTask(projectId, taskId, taskData);
    return task;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    await taskService.deleteTask(projectId, taskId);
    return taskId;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'to-do' | 'in-progress' | 'done'>) => {
      state.filter = action.payload;
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create task';
      })
      
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update task';
      })
      
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(t => t._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete task';
      });
  },
});

export const { setFilter, clearTasks, clearError } = taskSlice.actions;
export default taskSlice.reducer;
