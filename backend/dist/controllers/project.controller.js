"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProject = exports.editProject = exports.getSingleProject = exports.getAllProjects = exports.addProject = void 0;
const project_service_1 = require("../services/project.service");
const project_validation_1 = require("../validations/project.validation");
const addProject = async (req, res) => {
    try {
        const { error: bodyError } = project_validation_1.projectBodySchema.validate(req.body, {
            abortEarly: false,
        });
        if (bodyError) {
            return res.status(400).json({
                message: "Validation error",
                details: bodyError.details.map((d) => d.message),
            });
        }
        const { title, description, status } = req.body;
        const userId = req.user._id;
        const project = await (0, project_service_1.createProject)(title, description, status ?? "Active", userId);
        res.status(201).json({ project });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.addProject = addProject;
const getAllProjects = async (req, res) => {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        if (page < 1) {
            return res.status(400).json({ message: "Page must be greater than 0" });
        }
        if (limit < 1 || limit > 100) {
            return res
                .status(400)
                .json({ message: "Limit must be between 1 and 100" });
        }
        const result = await (0, project_service_1.getProjectsByUser)(userId, page, limit, search);
        res.status(200).json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getAllProjects = getAllProjects;
const getSingleProject = async (req, res) => {
    try {
        const { error: paramError } = project_validation_1.projectParamsSchema.validate(req.params);
        if (paramError) {
            return res.status(400).json({
                message: "Invalid project ID",
                details: paramError.details.map((d) => d.message),
            });
        }
        const projectId = req.params.projectId;
        const userId = req.user._id;
        const project = await (0, project_service_1.getProjectById)(projectId, userId);
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.status(200).json({ project });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getSingleProject = getSingleProject;
const editProject = async (req, res) => {
    try {
        const { error: paramError } = project_validation_1.projectParamsSchema.validate(req.params);
        if (paramError) {
            return res.status(400).json({
                message: "Invalid project ID",
                details: paramError.details.map((d) => d.message),
            });
        }
        const { error: bodyError } = project_validation_1.projectBodySchema.validate(req.body, {
            abortEarly: false,
        });
        if (bodyError) {
            return res.status(400).json({
                message: "Validation error",
                details: bodyError.details.map((d) => d.message),
            });
        }
        const projectId = req.params.projectId;
        const userId = req.user._id;
        const updateData = req.body;
        const project = await (0, project_service_1.updateProject)(projectId, userId, updateData);
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.status(200).json({ project });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.editProject = editProject;
const removeProject = async (req, res) => {
    try {
        // Validate params
        const { error: paramError } = project_validation_1.projectParamsSchema.validate(req.params);
        if (paramError) {
            return res.status(400).json({
                message: "Invalid project ID",
                details: paramError.details.map((d) => d.message),
            });
        }
        const projectId = req.params.projectId;
        const userId = req.user._id;
        const project = await (0, project_service_1.deleteProject)(projectId, userId);
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.status(200).json({ message: "Project deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.removeProject = removeProject;
//# sourceMappingURL=project.controller.js.map