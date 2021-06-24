"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chekout_controller_1 = __importDefault(require("../controllers/chekout-controller"));
const authjwt_1 = __importDefault(require("../middlewares/authjwt"));
class checkout {
    constructor() {
        this.router = express_1.Router();
        this.create();
    }
    create() {
        this.router.post("/create", authjwt_1.default.authentication, chekout_controller_1.default.createOrder);
    }
}
exports.default = new checkout().router;
