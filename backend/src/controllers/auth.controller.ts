import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validations/auth.validation";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({
          message: "Validation error",
          details: error.details.map((d) => d.message),
        });
    }

    const { name, email, password } = req.body;
    const user = await registerUser(name, email, password);

    res.status(201).json({ user });
  } catch (err: any) {
    res.status(400).json({ message: err.message || "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({
          message: "Validation error",
          details: error.details.map((d) => d.message),
        });
    }

    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (err: any) {
    res.status(401).json({ message: err.message || "Server error" });
  }
};
