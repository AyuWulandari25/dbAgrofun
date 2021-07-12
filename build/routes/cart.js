"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart-controller"));
const authjwt_1 = __importDefault(require("../middlewares/authjwt"));
class cart {
    constructor() {
        this.router = express_1.Router();
        this.add();
        this.delete();
        this.update();
        this.getAll();
        this.getId();
    }
    add() {
        this.router.post("/add/:id", cart_controller_1.default.addProductToCart);
    }
    delete() {
        this.router.delete("/delete/:id", authjwt_1.default.authentication, cart_controller_1.default.deleteCart);
    }
    update() {
        this.router.post("/update/:id", authjwt_1.default.authentication, cart_controller_1.default.updateCart);
    }
    getAll() {
        this.router.get("/getall", authjwt_1.default.authentication, cart_controller_1.default.getAllCart);
    }
    getId() {
        this.router.get("/:id", authjwt_1.default.authentication, cart_controller_1.default.getCartId);
    }
}
exports.default = new cart().router;
