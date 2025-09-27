import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import {
  createProject,
  getProjectsByUser,
  getProjectById,
  updateProject,
  deleteProject,
} from "../services/project.service";

import {
  projectBodySchema,
  projectParamsSchema,
} from "../validations/project.validation";

export const addProject = async (req: Request, res: Response) => {
  try {
    const { error: bodyError } = projectBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (bodyError) {
      return res.status(400).json({
        message: "Validation error",
        details: bodyError.details.map((d) => d.message),
      });
    }

    const { title, description, status } = req.body;
    const userId = req.user!._id as ObjectId;

    const project = await createProject(
      title,
      description,
      status ?? "Active",
      userId
    );
    res.status(201).json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const userId = req.user!._id as ObjectId;

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;

    if (page < 1) {
      return res.status(400).json({ message: "Page must be greater than 0" });
    }
    if (limit < 1 || limit > 100) {
      return res
        .status(400)
        .json({ message: "Limit must be between 1 and 100" });
    }

    const result = await getProjectsByUser(userId, page, limit, search);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSingleProject = async (req: Request, res: Response) => {
  try {
    const { error: paramError } = projectParamsSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({
        message: "Invalid project ID",
        details: paramError.details.map((d) => d.message),
      });
    }

    const projectId = req.params.projectId as string;
    const userId = req.user!._id as ObjectId;

    const project = await getProjectById(projectId, userId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const editProject = async (req: Request, res: Response) => {
  try {
    const { error: paramError } = projectParamsSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({
        message: "Invalid project ID",
        details: paramError.details.map((d) => d.message),
      });
    }

    const { error: bodyError } = projectBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (bodyError) {
      return res.status(400).json({
        message: "Validation error",
        details: bodyError.details.map((d) => d.message),
      });
    }

    const projectId = req.params.projectId as string;
    const userId = req.user!._id as ObjectId;
    const updateData = req.body;

    const project = await updateProject(projectId, userId, updateData);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ project });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeProject = async (req: Request, res: Response) => {
  try {
    // Validate params
    const { error: paramError } = projectParamsSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({
        message: "Invalid project ID",
        details: paramError.details.map((d) => d.message),
      });
    }

    const projectId = req.params.projectId as string;
    const userId = req.user!._id as ObjectId;

    const project = await deleteProject(projectId, userId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
