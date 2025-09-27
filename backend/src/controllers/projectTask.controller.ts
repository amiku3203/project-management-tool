  import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  createTask,
  getTasksByProject,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service";
import { getProjectById } from "../services/project.service";
import {
  taskBodySchema,
  taskUpdateSchema,
  taskParamsSchema,
} from "../validations/task.validation";

// Create task for a specific project
export const addTaskToProject = async (req: Request, res: Response) => {
  try {
    const { error: paramError } = taskParamsSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({
        message: "Invalid project ID",
        details: paramError.details.map((d) => d.message),
      });
    }

    const { error: bodyError } = taskBodySchema.validate(req.body, { abortEarly: false });
    if (bodyError) {
      return res.status(400).json({
        message: "Validation error",
        details: bodyError.details.map((d) => d.message),
      });
    }

    const projectId = req.params.projectId as string;
    const userId = req.user!._id as ObjectId;

    // Verify project exists and belongs to user
    const project = await getProjectById(projectId, userId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const taskData = {
      ...req.body,
      projectId: new ObjectId(projectId),
      userId,
    };

    const task = await createTask(taskData);
    res.status(201).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for a specific project
export const getProjectTasks = async (req: Request, res: Response) => {
  try {
    const { error: paramError } = taskParamsSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({
        message: "Invalid project ID",
        details: paramError.details.map((d) => d.message),
      });
    }

    const projectId = req.params.projectId as string;
    const userId = req.user!._id as ObjectId;
    const status = req.query.status as string;

    // Verify project exists and belongs to user
    const project = await getProjectById(projectId, userId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const tasks = await getTasksByProject(projectId, userId, status);
    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single task from a project
export const getProjectTask = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const taskId = req.params.taskId as string;
    const userId = req.user!._id as ObjectId;

    // Verify project exists and belongs to user
    const project = await getProjectById(projectId, userId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = await getTaskById(taskId, userId);
    if (!task || task.projectId.toString() !== projectId) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update task in a project
export const updateProjectTask = async (req: Request, res: Response) => {
  try {
    console.log('Update task request:', {
      projectId: req.params.projectId,
      taskId: req.params.taskId,
      body: req.body,
      userId: req.user!._id
    });

    const { error: bodyError } = taskUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (bodyError) {
      console.log('Validation error:', bodyError.details);
      return res.status(400).json({
        message: "Validation error",
        details: bodyError.details.map((d) => d.message),
      });
    }

    const projectId = req.params.projectId as string;
    const taskId = req.params.taskId as string;
    const userId = req.user!._id as ObjectId;

    // Verify project exists and belongs to user
    const project = await getProjectById(projectId, userId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Verify task exists and belongs to the project
    const existingTask = await getTaskById(taskId, userId);
    if (!existingTask || existingTask.projectId.toString() !== projectId) {
      return res.status(404).json({ message: "Task not found" });
    }

    const task = await updateTask(taskId, userId, req.body);
    console.log('Updated task:', task);
    res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete task from a project
export const deleteProjectTask = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId as string;
    const taskId = req.params.taskId as string;
    const userId = req.user!._id as ObjectId;

    // Verify project exists and belongs to user
    const project = await getProjectById(projectId, userId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Verify task exists and belongs to the project
    const existingTask = await getTaskById(taskId, userId);
    if (!existingTask || existingTask.projectId.toString() !== projectId) {
      return res.status(404).json({ message: "Task not found" });
    }

    await deleteTask(taskId, userId);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
