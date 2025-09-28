import { ITask } from "../models/task.model";
import { Types } from "mongoose";
export declare const createTask: (data: Omit<ITask, "_id" | "createdAt" | "updatedAt">) => Promise<import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export declare const getTasksByUser: (userId: Types.ObjectId) => Promise<(import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: Types.ObjectId;
} & {
    __v: number;
})[]>;
export declare const getTasksByProject: (projectId: string, userId: Types.ObjectId, status?: string) => Promise<(import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: Types.ObjectId;
} & {
    __v: number;
})[]>;
export declare const getTaskById: (taskId: string, userId: Types.ObjectId) => Promise<(import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: Types.ObjectId;
} & {
    __v: number;
}) | null>;
export declare const updateTask: (taskId: string, userId: Types.ObjectId, updateData: Partial<ITask>) => Promise<(import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: Types.ObjectId;
} & {
    __v: number;
}) | null>;
export declare const deleteTask: (taskId: string, userId: Types.ObjectId) => Promise<(import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: Types.ObjectId;
} & {
    __v: number;
}) | null>;
export declare const getTasksByStatus: (userId: Types.ObjectId, status: ITask["status"]) => Promise<(import("mongoose").Document<unknown, {}, ITask, {}, {}> & ITask & {
    _id: Types.ObjectId;
} & {
    __v: number;
})[]>;
