"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chekout_controller_1 = __importDefault(require("../controllers/chekout-controller"));
class checkout {
    constructor() {
        this.router = express_1.Router();
        this.create();
    }
    create() {
        this.router.post("/create", chekout_controller_1.default.createOrder);
    }
}
exports.default = new checkout().router;
