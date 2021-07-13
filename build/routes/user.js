"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
class user {
    constructor() {
        this.router = express_1.Router();
        this.getUserId();
    }
    getUserId() {
        this.router.get("/:id/detail", user_controller_1.default.detailUser);
    }
}
exports.default = new user().router;
