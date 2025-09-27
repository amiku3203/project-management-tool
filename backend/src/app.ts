import express from "express";

import cors from "cors";

import dotenv from "dotenv";

import router from "./routes/index.route";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api", router);
app.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

export default app;
