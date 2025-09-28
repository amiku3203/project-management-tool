"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = __importDefault(require("../models/auth.model"));
const auth_constants_1 = require("../utils/auth.constants");
const registerUser = async (name, email, password) => {
    const existingUser = await auth_model_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
    const user = new auth_model_1.default({ name, email, password: hashedPassword });
    await user.save();
    return { id: user._id, name: user.name, email: user.email };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await auth_model_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid email or password");
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid email or password");
    const token = jsonwebtoken_1.default.sign({ id: user._id }, auth_constants_1.JWT_SECRET, { expiresIn: "7d" });
    return { user, token };
};
exports.loginUser = loginUser;
//# sourceMappingURL=auth.service.js.map