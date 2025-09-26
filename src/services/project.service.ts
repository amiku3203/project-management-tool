 import Project, { IProject } from "../models/project.model";
import mongoose from "mongoose";

 
export const createProject = async (
  title: string,
  description: string,
  status: "active" | "completed",
  userId: mongoose.Types.ObjectId
): Promise<IProject> => {
  const project = new Project({ title, description, status, userId });
  await project.save();
  return project;
};

 
export const getProjectsByUser = async (userId: mongoose.Types.ObjectId): Promise<IProject[]> => {
  return Project.find({ userId });
};

 
export const getProjectById = async (
  projectId: string,
  userId: mongoose.Types.ObjectId
): Promise<IProject | null> => {
  return Project.findOne({ _id: projectId, userId });
};

 
export const updateProject = async (
  projectId: string,
  userId: mongoose.Types.ObjectId,
  updateData: Partial<Pick<IProject, "title" | "description" | "status">>
): Promise<IProject | null> => {
  return Project.findOneAndUpdate({ _id: projectId, userId }, updateData, { new: true });
};

 
export const deleteProject = async (
  projectId: string,
  userId: mongoose.Types.ObjectId
): Promise<IProject | null> => {
  return Project.findOneAndDelete({ _id: projectId, userId });
};
