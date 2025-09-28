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
declare const Task: mongoose.Model<ITask, {}, {}, {}, mongoose.Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Task;
