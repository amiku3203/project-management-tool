 import * as yup from "yup";

export const taskSchema = yup.object({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  status: yup
    .string()
    .oneOf(['to-do', 'in-progress', 'done'], "Invalid status")
    .required("Status is required"),
  dueDate: yup
    .date()
    .min(new Date(new Date().setHours(0, 0, 0, 0)), "Due date cannot be in the past")
    .required("Due date is required"),
});
