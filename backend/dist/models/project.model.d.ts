import mongoose from "mongoose";
export interface IProject {
    title: string;
    description: string;
    status: "Active" | "Completed";
    userId: mongoose.Types.ObjectId;
}
declare const Project: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, {}> & IProject & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Project;
