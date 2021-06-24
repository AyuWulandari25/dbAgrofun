"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const product_1 = __importDefault(require("../routes/product"));
const category_1 = __importDefault(require("../routes/category"));
const cart_1 = __importDefault(require("../routes/cart"));
const checkout_1 = __importDefault(require("../routes/checkout"));
const profile_1 = __importDefault(require("../routes/profile"));
class Routes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
        this.auth();
        this.product();
        this.category();
        this.cart();
        this.checkout();
        this.profile();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.status(200).json({ msg: "Welcome in AgroFun" });
        });
    }
    auth() {
        this.router.use("", auth_routes_1.default);
    }
    profile() {
        this.router.use("/profile", profile_1.default);
    }
    product() {
        this.router.use("/product", product_1.default);
    }
    category() {
        this.router.use("/category", category_1.default);
    }
    cart() {
        this.router.use("/cart", cart_1.default);
    }
    checkout() {
        this.router.use("/checkout", checkout_1.default);
    }
}
exports.default = new Routes().router;
