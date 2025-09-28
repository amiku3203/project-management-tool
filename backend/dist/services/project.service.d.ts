import { IProject } from "../models/project.model";
import mongoose from "mongoose";
export declare const createProject: (title: string, description: string, status: "active" | "completed", userId: mongoose.Types.ObjectId) => Promise<IProject>;
export declare const getProjectsByUser: (userId: mongoose.Types.ObjectId, page?: number, limit?: number, search?: string) => Promise<{
    projects: IProject[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalProjects: number;
        limit: number;
    };
}>;
export declare const getProjectById: (projectId: string, userId: mongoose.Types.ObjectId) => Promise<IProject | null>;
export declare const updateProject: (projectId: string, userId: mongoose.Types.ObjectId, updateData: Partial<Pick<IProject, "title" | "description" | "status">>) => Promise<IProject | null>;
export declare const deleteProject: (projectId: string, userId: mongoose.Types.ObjectId) => Promise<IProject | null>;
