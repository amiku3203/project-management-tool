import mongoose from "mongoose";

export interface IProject {
  title: string;
  description: string;
  status: string;
  userId: mongoose.Types.ObjectId;
}

const projectSchema = new mongoose.Schema<IProject>({
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
    enum: ["Active", "Completed"],
    default: "Active",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
