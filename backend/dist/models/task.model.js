"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    projectId: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "Project",
        required: true,
    }
}, {
    timestamps: true, // This adds createdAt and updatedAt automatically
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
//# sourceMappingURL=task.model.js.map