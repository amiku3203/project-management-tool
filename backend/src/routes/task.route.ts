import { Router } from "express";
import {
  addTask,
  getAllTasks,
  getSingleTask,
  editTask,
  removeTask,
  getTasksThrowStatus,
} from "../controllers/task.controller";

import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", addTask);
router.get("/", getAllTasks);
router.get("/:taskId", getSingleTask);
router.put("/:taskId", editTask);
router.delete("/:taskId", removeTask);
router.get("/status/filter", getTasksThrowStatus);
export default router;
