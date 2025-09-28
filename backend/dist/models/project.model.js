"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
    },
}, { timestamps: true });
const Project = mongoose_1.default.model("Project", projectSchema);
exports.default = Project;
//# sourceMappingURL=project.model.js.map