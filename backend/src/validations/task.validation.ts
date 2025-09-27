import Joi from "joi";

export const taskBodySchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(500).required(),
  status: Joi.string().valid("to-do", "in-progress", "done"),
  projectId: Joi.string().length(24).hex().required(),
});

export const taskParamsSchema = Joi.object({
  taskId: Joi.string().length(24).hex().required(),
});

export const taskStatusQuerySchema = Joi.object({
  status: Joi.string().valid("to-do", "in-progress", "done").required(),
});