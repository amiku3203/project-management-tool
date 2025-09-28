"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectTask = exports.updateProjectTask = exports.getProjectTask = exports.getProjectTasks = exports.addTaskToProject = void 0;
const mongodb_1 = require("mongodb");
const task_service_1 = require("../services/task.service");
const project_service_1 = require("../services/project.service");
const task_validation_1 = require("../validations/task.validation");
// Create task for a specific project
const addTaskToProject = async (req, res) => {
    try {
        const { error: paramError } = task_validation_1.taskParamsSchema.validate(req.params);
        if (paramError) {
            return res.status(400).json({
                message: "Invalid project ID",
                details: paramError.details.map((d) => d.message),
            });
        }
        const { error: bodyError } = task_validation_1.taskBodySchema.validate(req.body, { abortEarly: false });
        if (bodyError) {
            return res.status(400).json({
                message: "Validation error",
                details: bodyError.details.map((d) => d.message),
            });
        }
        const projectId = req.params.projectId;
        const userId = req.user._id;
        // Verify project exists and belongs to user
        const project = await (0, project_service_1.getProjectById)(projectId, userId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const taskData = {
            ...req.body,
            projectId: new mongodb_1.ObjectId(projectId),
            userId,
        };
        const task = await (0, task_service_1.createTask)(taskData);
        res.status(201).json({ task });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.addTaskToProject = addTaskToProject;
// Get all tasks for a specific project
const getProjectTasks = async (req, res) => {
    try {
        const { error: paramError } = task_validation_1.taskParamsSchema.validate(req.params);
        if (paramError) {
            return res.status(400).json({
                message: "Invalid project ID",
                details: paramError.details.map((d) => d.message),
            });
        }
        const projectId = req.params.projectId;
        const userId = req.user._id;
        const status = req.query.status;
        // Verify project exists and belongs to user
        const project = await (0, project_service_1.getProjectById)(projectId, userId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const tasks = await (0, task_service_1.getTasksByProject)(projectId, userId, status);
        res.status(200).json({ tasks });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getProjectTasks = getProjectTasks;
// Get single task from a project
const getProjectTask = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;
        const userId = req.user._id;
        // Verify project exists and belongs to user
        const project = await (0, project_service_1.getProjectById)(projectId, userId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        const task = await (0, task_service_1.getTaskById)(taskId, userId);
        if (!task || task.projectId.toString() !== projectId) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ task });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getProjectTask = getProjectTask;
// Update task in a project
const updateProjectTask = async (req, res) => {
    try {
        console.log('Update task request:', {
            projectId: req.params.projectId,
            taskId: req.params.taskId,
            body: req.body,
            userId: req.user._id
        });
        const { error: bodyError } = task_validation_1.taskUpdateSchema.validate(req.body, {
            abortEarly: false,
        });
        if (bodyError) {
            console.log('Validation error:', bodyError.details);
            return res.status(400).json({
                message: "Validation error",
                details: bodyError.details.map((d) => d.message),
            });
        }
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;
        const userId = req.user._id;
        // Verify project exists and belongs to user
        const project = await (0, project_service_1.getProjectById)(projectId, userId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        // Verify task exists and belongs to the project
        const existingTask = await (0, task_service_1.getTaskById)(taskId, userId);
        if (!existingTask || existingTask.projectId.toString() !== projectId) {
            return res.status(404).json({ message: "Task not found" });
        }
        const task = await (0, task_service_1.updateTask)(taskId, userId, req.body);
        console.log('Updated task:', task);
        res.status(200).json({ task });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateProjectTask = updateProjectTask;
// Delete task from a project
const deleteProjectTask = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const taskId = req.params.taskId;
        const userId = req.user._id;
        // Verify project exists and belongs to user
        const project = await (0, project_service_1.getProjectById)(projectId, userId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        // Verify task exists and belongs to the project
        const existingTask = await (0, task_service_1.getTaskById)(taskId, userId);
        if (!existingTask || existingTask.projectId.toString() !== projectId) {
            return res.status(404).json({ message: "Task not found" });
        }
        await (0, task_service_1.deleteTask)(taskId, userId);
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteProjectTask = deleteProjectTask;
//# sourceMappingURL=projectTask.controller.js.map