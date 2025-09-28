"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskStatusQuerySchema = exports.taskParamsSchema = exports.taskUpdateSchema = exports.taskBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.taskBodySchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required(),
    description: joi_1.default.string().min(5).max(500).required(),
    status: joi_1.default.string().valid("to-do", "in-progress", "done").default("todo"),
    dueDate: joi_1.default.date().required(),
});
exports.taskUpdateSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100),
    description: joi_1.default.string().min(5).max(500),
    status: joi_1.default.string().valid("to-do", "in-progress", "done"),
    dueDate: joi_1.default.date(),
}).min(1);
exports.taskParamsSchema = joi_1.default.object({
    projectId: joi_1.default.string().length(24).hex().required(),
    taskId: joi_1.default.string().length(24).hex(),
});
exports.taskStatusQuerySchema = joi_1.default.object({
    status: joi_1.default.string().valid("to-do", "in-progress", "done").required(),
});
//# sourceMappingURL=task.validation.js.map