import mongoose from "mongoose";

export interface ITask {
  title: string;
  description: string;
  status:  "to-do" |"in-progress" | "done";
  userId: mongoose.Types.ObjectId;
  projectId:mongoose.Types.ObjectId;
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
    enum: ["to-do", "in-progress","done"],
    default: "to-do",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  projectId:{
     type:mongoose.Schema.ObjectId,
     ref:"Project"
  }
});

const  Task = mongoose.model<ITask>("Task",  taskSchema);

export default  Task;
