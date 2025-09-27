import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import Task from "../models/task.model";
import User from "../models/auth.model";
import Project from "../models/project.model";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mern-ts";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected...");

    let user = await User.findOne({ email: "test@example.com" });
    if (!user) {
      const hashedPassword = await bcrypt.hash("Test@123", 10);
      user = await User.create({
        name: "Test User",
        email: "test@example.com",
        password: hashedPassword,
      });
      console.log("User created:", user.email);
    } else {
      console.log("User already exists:", user.email);
    }

    const projectData = [
      { title: "Project 1", description: "First project", status: "Active" },
      { title: "Project 2", description: "Second project", status: "Active" },
    ];

    const projects: any[] = [];

    for (const data of projectData) {
      let project = await Project.findOne({
        title: data.title,
        userId: user._id,
      });
      if (!project) {
        project = await Project.create({ ...data, userId: user._id });
        console.log("Project created:", project.title);
      } else {
        console.log("Project already exists:", project.title);
      }
      projects.push(project);
    }

    for (const project of projects) {
      for (let i = 1; i <= 3; i++) {
        const taskTitle = `Task ${i} for ${project.title}`;

        const existingTask = await Task.findOne({
          title: taskTitle,
          projectId: project._id,
        });
        if (!existingTask) {
          await Task.create({
            title: taskTitle,
            description: `Description for task ${i} in ${project.title}`,
            status: i === 3 ? "done" : i === 2 ? "in-progress" : "to-do",
            userId: user._id,
            projectId: project._id,
          });
          console.log("Task created:", taskTitle);
        } else {
          console.log("Task already exists:", taskTitle);
        }
      }
    }

    console.log("Database seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();
