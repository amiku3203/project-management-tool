import  express  from "express";

import cors from "cors"

import dotenv from "dotenv"

dotenv.config();


const app=  express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


app.get("/", (_req, res) => {
  res.json({ message: "API is running" });
});

export default app;