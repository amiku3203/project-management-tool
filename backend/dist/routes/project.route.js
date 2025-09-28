"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = require("../controllers/project.controller");
const projectTask_controller_1 = require("../controllers/projectTask.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
// Project routes
router.post("/", project_controller_1.addProject);
router.get("/", project_controller_1.getAllProjects);
router.get("/:projectId", project_controller_1.getSingleProject);
router.put("/:projectId", project_controller_1.editProject);
router.delete("/:projectId", project_controller_1.removeProject);
// Nested task routes
router.post("/:projectId/tasks", projectTask_controller_1.addTaskToProject);
router.get("/:projectId/tasks", projectTask_controller_1.getProjectTasks);
router.get("/:projectId/tasks/:taskId", projectTask_controller_1.getProjectTask);
router.put("/:projectId/tasks/:taskId", projectTask_controller_1.updateProjectTask);
router.delete("/:projectId/tasks/:taskId", projectTask_controller_1.deleteProjectTask);
exports.default = router;
//# sourceMappingURL=project.route.js.map