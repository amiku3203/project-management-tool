import Task, { ITask } from "../models/task.model";
import { Types } from "mongoose";

 
export const createTask = async (data: Omit<ITask, "_id">) => {
  const task = await Task.create(data);
  return task;
};

 
export const getTasksByUser = async (userId: Types.ObjectId) => {
  return await Task.find({ userId });
};

 
export const getTaskById = async (taskId: string, userId: Types.ObjectId) => {
  return await Task.findOne({ _id: taskId, userId });
};

 
export const updateTask = async (
  taskId: string,
  userId: Types.ObjectId,
  updateData: Partial<ITask>
) => {
  return await Task.findOneAndUpdate({ _id: taskId, userId }, updateData, { new: true });
};

 
export const deleteTask = async (taskId: string, userId: Types.ObjectId) => {
  return await Task.findOneAndDelete({ _id: taskId, userId });
};


export const getTasksByStatus = async (userId: Types.ObjectId, status: ITask["status"]) => {
  return await Task.find({ userId, status });
};