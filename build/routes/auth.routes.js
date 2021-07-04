"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
class auth {
    constructor() {
        this.router = express_1.Router();
        this.register();
        this.login();
    }
    register() {
        this.router.post("/register", auth_controller_1.default.register);
    }
    login() {
        this.router.post("/login", auth_controller_1.default.login);
    }
}
exports.default = new auth().router;
