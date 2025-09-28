import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import router from "./routes/index.route";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://project-management-tool-dev.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded());

app.use("/api", router);
app.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

export default app;
