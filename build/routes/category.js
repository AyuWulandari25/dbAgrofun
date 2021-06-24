"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("../controllers/category-controller"));
class category {
    constructor() {
        this.router = express_1.Router();
        this.create();
        this.getAll();
        this.getId();
    }
    create() {
        this.router.post("/create", category_controller_1.default.createCategory);
    }
    getAll() {
        this.router.post("/allcategory", category_controller_1.default.getAllCategory);
    }
    getId() {
        this.router.post("/categoryId", category_controller_1.default.categoryId);
    }
}
exports.default = new category().router;
