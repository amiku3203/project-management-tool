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

 
export const getProjectsByUser = async (
  userId: mongoose.Types.ObjectId,
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<{
  projects: IProject[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    limit: number;
  };
}> => {
  const skip = (page - 1) * limit;
  
  // Build search query
  let query: any = { userId };
  if (search && search.trim()) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Get total count for pagination
  const totalProjects = await Project.countDocuments(query);
  const totalPages = Math.ceil(totalProjects / limit);
  
  // Get projects with pagination
  const projects = await Project.find(query)
    .sort({ createdAt: -1 }) // Sort by newest first
    .skip(skip)
    .limit(limit);
  
  return {
    projects,
    pagination: {
      currentPage: page,
      totalPages,
      totalProjects,
      limit,
    },
  };
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
