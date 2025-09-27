import { Router } from "express";
import {
  addProject,
  getAllProjects,
  getSingleProject,
  editProject,
  removeProject,
} from "../controllers/project.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", addProject);
router.get("/", getAllProjects);
router.get("/:projectId", getSingleProject);
router.put("/:projectId", editProject);
router.delete("/:projectId", removeProject);

export default router;
