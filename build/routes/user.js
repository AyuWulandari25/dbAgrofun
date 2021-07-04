"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const authjwt_1 = __importDefault(require("../middlewares/authjwt"));
class profile {
    constructor() {
        this.router = express_1.Router();
        this.getUserId();
    }
    getUserId() {
        this.router.get("/detail", authjwt_1.default.authentication, user_controller_1.default.detailUser);
    }
}
exports.default = new profile().router;
