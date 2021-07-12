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
const user_1 = __importDefault(require("../routes/user"));
const authjwt_1 = __importDefault(require("../middlewares/authjwt"));
class Routes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
        this.auth();
        this.product();
        this.category();
        this.authJWT();
        this.cart();
        this.checkout();
        this.user();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.status(200).json({ msg: "Welcome in AgroFun" });
        });
    }
    auth() {
        this.router.use("", auth_routes_1.default);
    }
    product() {
        this.router.use("/product", product_1.default);
    }
    category() {
        this.router.use("/category", category_1.default);
    }
    authJWT() {
        this.router.use(authjwt_1.default.authentication);
    }
    user() {
        this.router.use("/user", user_1.default);
    }
    cart() {
        this.router.use("/cart", cart_1.default);
    }
    checkout() {
        this.router.use("/checkout", checkout_1.default);
    }
}
exports.default = new Routes().router;
