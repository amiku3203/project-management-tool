import { Router } from "express";
import authRoutes from "./auth.route";
import projectRoutes from "./project.route";
import taskRoutes from "./task.route";

const router = Router();

router.use("/auth", authRoutes);

router.use("/projects", projectRoutes);

router.use("/tasks", taskRoutes);

export default router;
