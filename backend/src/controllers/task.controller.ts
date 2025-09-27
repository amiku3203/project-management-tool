import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByStatus,
  
} from "../services/task.service";
import {
  taskBodySchema,
  taskParamsSchema,
  taskStatusQuerySchema,
} from "../validations/task.validation";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { error } = taskBodySchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map((d) => d.message),
      });
    }

    const userId = req.user!._id as ObjectId;
    const task = await createTask({ ...req.body, userId });
    res.status(201).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id as ObjectId;
    const tasks = await getTasksByUser(userId);
    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleTask = async (req: Request, res: Response) => {
  try {
    const { error } = taskParamsSchema.validate(req.params);
    if (error) {
      return res.status(400).json({
        message: "Invalid task ID",
        details: error.details.map((d) => d.message),
      });
    }

    const taskId = req.params.taskId as string;
    const userId = req.user!._id as ObjectId;

    const task = await getTaskById(taskId, userId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const { error } = taskParamsSchema.validate(req.params);
    if (error) {
      return res.status(400).json({
        message: "Invalid task ID",
        details: error.details.map((d) => d.message),
      });
    }

    const { error: bodyError } = taskBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (bodyError) {
      return res.status(400).json({
        message: "Validation error",
        details: bodyError.details.map((d) => d.message),
      });
    }

    const taskId = req.params.taskId as string;
    const userId = req.user!._id as ObjectId;

    const task = await updateTask(taskId, userId, req.body);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeTask = async (req: Request, res: Response) => {
  try {
    const { error: paramError } = taskParamsSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({
        message: "Invalid task ID",
        details: paramError.details.map((d) => d.message),
      });
    }

    const taskId = req.params.taskId as string;
    const userId = req.user!._id as ObjectId;

    const task = await deleteTask(taskId, userId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTasksThrowStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id as ObjectId;

    // Validate query
    const { error } =  taskStatusQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({
        message: "Invalid query parameter",
        details: error.details.map(d => d.message),
      });
    }

    const status = req.query.status as "to-do" | "in-progress" | "done";
    const tasks = await   getTasksByStatus(userId, status);

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};