"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const auth_validation_1 = require("../validations/auth.validation");
const auth_service_1 = require("../services/auth.service");
const register = async (req, res) => {
    try {
        const { error } = auth_validation_1.registerSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({
                message: "Validation error",
                details: error.details.map((d) => d.message),
            });
        }
        const { name, email, password } = req.body;
        const user = await (0, auth_service_1.registerUser)(name, email, password);
        res.status(201).json({ user });
    }
    catch (err) {
        res.status(400).json({ message: err.message || "Server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { error } = auth_validation_1.loginSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({
                message: "Validation error",
                details: error.details.map((d) => d.message),
            });
        }
        const { email, password } = req.body;
        const { user, token } = await (0, auth_service_1.loginUser)(email, password);
        res.status(200).json({ message: "Login successful", user, token });
    }
    catch (err) {
        res.status(401).json({ message: err.message || "Server error" });
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map