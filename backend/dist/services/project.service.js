"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.getProjectById = exports.getProjectsByUser = exports.createProject = void 0;
const project_model_1 = __importDefault(require("../models/project.model"));
const createProject = async (title, description, status, userId) => {
    const project = new project_model_1.default({ title, description, status, userId });
    await project.save();
    return project;
};
exports.createProject = createProject;
const getProjectsByUser = async (userId, page = 1, limit = 10, search) => {
    const skip = (page - 1) * limit;
    // Build search query
    let query = { userId };
    if (search && search.trim()) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }
    // Get total count for pagination
    const totalProjects = await project_model_1.default.countDocuments(query);
    const totalPages = Math.ceil(totalProjects / limit);
    // Get projects with pagination
    const projects = await project_model_1.default.find(query)
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
exports.getProjectsByUser = getProjectsByUser;
const getProjectById = async (projectId, userId) => {
    return project_model_1.default.findOne({ _id: projectId, userId });
};
exports.getProjectById = getProjectById;
const updateProject = async (projectId, userId, updateData) => {
    return project_model_1.default.findOneAndUpdate({ _id: projectId, userId }, updateData, { new: true });
};
exports.updateProject = updateProject;
const deleteProject = async (projectId, userId) => {
    return project_model_1.default.findOneAndDelete({ _id: projectId, userId });
};
exports.deleteProject = deleteProject;
//# sourceMappingURL=project.service.js.map