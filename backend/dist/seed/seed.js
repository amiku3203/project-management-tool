"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const task_model_1 = __importDefault(require("../models/task.model"));
const auth_model_1 = __importDefault(require("../models/auth.model"));
const project_model_1 = __importDefault(require("../models/project.model"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern-ts";
const seedDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log("MongoDB connected...");
        let user = await auth_model_1.default.findOne({ email: "test@example.com" });
        if (!user) {
            const hashedPassword = await bcrypt_1.default.hash("Test@123", 10);
            user = await auth_model_1.default.create({
                name: "Test User",
                email: "test@example.com",
                password: hashedPassword,
            });
            console.log("User created:", user.email);
        }
        else {
            console.log("User already exists:", user.email);
        }
        const projectData = [
            { title: "Project 1", description: "First project", status: "Active" },
            { title: "Project 2", description: "Second project", status: "Active" },
        ];
        const projects = [];
        for (const data of projectData) {
            let project = await project_model_1.default.findOne({
                title: data.title,
                userId: user._id,
            });
            if (!project) {
                project = await project_model_1.default.create({ ...data, userId: user._id });
                console.log("Project created:", project.title);
            }
            else {
                console.log("Project already exists:", project.title);
            }
            projects.push(project);
        }
        for (const project of projects) {
            for (let i = 1; i <= 3; i++) {
                const taskTitle = `Task ${i} for ${project.title}`;
                const existingTask = await task_model_1.default.findOne({
                    title: taskTitle,
                    projectId: project._id,
                });
                if (!existingTask) {
                    await task_model_1.default.create({
                        title: taskTitle,
                        description: `Description for task ${i} in ${project.title}`,
                        status: i === 3 ? "done" : i === 2 ? "in-progress" : "to-do",
                        userId: user._id,
                        projectId: project._id,
                    });
                    console.log("Task created:", taskTitle);
                }
                else {
                    console.log("Task already exists:", taskTitle);
                }
            }
        }
        console.log("Database seeding completed!");
        process.exit(0);
    }
    catch (err) {
        console.error("Seeding error:", err);
        process.exit(1);
    }
};
seedDatabase();
//# sourceMappingURL=seed.js.map