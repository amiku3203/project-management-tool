"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectParamsSchema = exports.projectBodySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.projectBodySchema = joi_1.default.object({
    title: joi_1.default.string().min(2).required(),
    description: joi_1.default.string().min(5).required(),
    status: joi_1.default.string().valid("Active", "Completed").optional(),
});
exports.projectParamsSchema = joi_1.default.object({
    projectId: joi_1.default.string().required(),
});
//# sourceMappingURL=project.validation.js.map