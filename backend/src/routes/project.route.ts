   import { Router } from "express";
import {
  addProject,
  getAllProjects,
  getSingleProject,
  editProject,
  removeProject,
} from "../controllers/project.controller";
import {
  addTaskToProject,
  getProjectTasks,
  getProjectTask,
  updateProjectTask,
  deleteProjectTask,
} from "../controllers/projectTask.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

// Project routes
router.post("/", addProject);
router.get("/", getAllProjects);
router.get("/:projectId", getSingleProject);
router.put("/:projectId", editProject);
router.delete("/:projectId", removeProject);

// Nested task routes
router.post("/:projectId/tasks", addTaskToProject);
router.get("/:projectId/tasks", getProjectTasks);
router.get("/:projectId/tasks/:taskId", getProjectTask);
router.put("/:projectId/tasks/:taskId", updateProjectTask);
router.delete("/:projectId/tasks/:taskId", deleteProjectTask);

export default router;
