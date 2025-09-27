  import Joi from "joi";

export const taskBodySchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(5).max(500).required(),
  status: Joi.string().valid("to-do", "in-progress", "done").default("todo"),
  dueDate: Joi.date().required(),
});

export const taskUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100),
  description: Joi.string().min(5).max(500),
  status: Joi.string().valid("to-do", "in-progress", "done"),
  dueDate: Joi.date(),
}).min(1);  

export const taskParamsSchema = Joi.object({
  projectId: Joi.string().length(24).hex().required(),
  taskId: Joi.string().length(24).hex(),
});

export const taskStatusQuerySchema = Joi.object({
  status: Joi.string().valid("to-do", "in-progress", "done").required(),
});