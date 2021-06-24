"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product-controller"));
const authjwt_1 = __importDefault(require("../middlewares/authjwt"));
class product {
    constructor() {
        this.router = express_1.Router();
        this.create();
        this.getAll();
        this.getId();
    }
    create() {
        this.router.post("/create", product_controller_1.default.createProduct);
    }
    getAll() {
        this.router.get("/allproduct", authjwt_1.default.authentication, product_controller_1.default.getAllProduct);
    }
    getId() {
        this.router.get("/:id", authjwt_1.default.authentication, product_controller_1.default.productId);
    }
}
exports.default = new product().router;
