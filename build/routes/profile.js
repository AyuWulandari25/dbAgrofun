"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = __importDefault(require("../controllers/profile-controller"));
const authjwt_1 = __importDefault(require("../middlewares/authjwt"));
class profile {
    constructor() {
        this.router = express_1.Router();
        this.create();
    }
    create() {
        this.router.post("/create", authjwt_1.default.authentication, profile_controller_1.default.creatProfile);
    }
    update() {
        this.router.post("/update", authjwt_1.default.authentication, profile_controller_1.default.updateProfile);
    }
}
exports.default = new profile().router;
