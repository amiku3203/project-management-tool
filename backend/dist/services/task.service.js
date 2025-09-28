"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasksByStatus = exports.deleteTask = exports.updateTask = exports.getTaskById = exports.getTasksByProject = exports.getTasksByUser = exports.createTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const createTask = async (data) => {
    const task = await task_model_1.default.create(data);
    return task;
};
exports.createTask = createTask;
const getTasksByUser = async (userId) => {
    return await task_model_1.default.find({ userId });
};
exports.getTasksByUser = getTasksByUser;
const getTasksByProject = async (projectId, userId, status) => {
    let query = { projectId, userId };
    if (status && status !== "all") {
        query.status = status;
    }
    return await task_model_1.default.find(query).sort({ createdAt: -1 });
};
exports.getTasksByProject = getTasksByProject;
const getTaskById = async (taskId, userId) => {
    return await task_model_1.default.findOne({ _id: taskId, userId });
};
exports.getTaskById = getTaskById;
const updateTask = async (taskId, userId, updateData) => {
    return await task_model_1.default.findOneAndUpdate({ _id: taskId, userId }, updateData, {
        new: true,
    });
};
exports.updateTask = updateTask;
const deleteTask = async (taskId, userId) => {
    return await task_model_1.default.findOneAndDelete({ _id: taskId, userId });
};
exports.deleteTask = deleteTask;
const getTasksByStatus = async (userId, status) => {
    return await task_model_1.default.find({ userId, status });
};
exports.getTasksByStatus = getTasksByStatus;
//# sourceMappingURL=task.service.js.map