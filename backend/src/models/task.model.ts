  import mongoose from "mongoose";

export interface ITask {
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "done";
  dueDate: Date;
  userId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema = new mongoose.Schema<ITask>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "done"],
    default: "todo",
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: true,
  }
}, {
  timestamps: true, // This adds createdAt and updatedAt automatically
});

const  Task = mongoose.model<ITask>("Task",  taskSchema);

export default  Task;
