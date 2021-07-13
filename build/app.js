"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor() {
        this.app = express_1.default();
        this.plugin();
        this.router();
        dotenv_1.default.config();
    }
    plugin() {
        this.app.use(cors_1.default({ origin: "http://localhost:4200/" }));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        db_1.default();
    }
    router() {
        this.app.use(index_1.default);
    }
}
exports.default = new App().app;
