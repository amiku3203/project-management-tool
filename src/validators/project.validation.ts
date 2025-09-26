 import Joi from "joi";

 
export const projectBodySchema = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().min(5).required(),
  status: Joi.string().valid("Active", "Completed").optional(),
});

 
export const projectParamsSchema = Joi.object({
  projectId: Joi.string().required(),
});
