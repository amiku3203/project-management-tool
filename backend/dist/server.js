"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("./config/mongoose"));
const PORT = process.env.PORT;
const startServer = async () => {
    try {
        await (0, mongoose_1.default)();
        app_1.default.listen(PORT, () => {
            console.log(`Server started successfully on http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error(" Failed to start server:", err);
    }
};
startServer();
//# sourceMappingURL=server.js.map