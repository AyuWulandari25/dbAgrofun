"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cart_1 = __importDefault(require("../models/Cart"));
const Product_1 = __importDefault(require("../models/Product"));
class Cart {
    static addProductToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield req.UserId;
            const productId = req.params.id;
            const cartsReady = yield Cart_1.default.countDocuments({
                users: userId,
                items: productId,
            });
            const findproduct = yield Product_1.default.findById(productId);
            const priceProduct = findproduct.price;
            const totalprice = priceProduct;
            try {
                if (cartsReady == 1) {
                    const findIdCart = yield Cart_1.default.findOne({
                        users: userId,
                        items: productId,
                    });
                    const cartId = findIdCart.id;
                    const UpdateCarts = yield Cart_1.default.findByIdAndUpdate(cartId, { $inc: { quantity: 1, subtotal_payment: totalprice } }, { new: true });
                    const updateStockProduct = yield Product_1.default.findByIdAndUpdate(productId, {
                        $inc: { stock: -1 },
                    }, { new: true });
                    res
                        .status(200)
                        .json({ msg: "Succesfully add product to cart", data: UpdateCarts });
                }
                else {
                    const newCart = yield Cart_1.default.create({
                        users: userId,
                        items: productId,
                        quantity: +1,
                        subtotal_payment: totalprice,
                    });
                    const StockProduct = yield Product_1.default.findByIdAndUpdate(productId, {
                        $inc: { stock: -1 },
                    }, { new: true });
                    res.status(201).json({
                        success: true,
                        message: "Success add to new cart!",
                        data: newCart,
                    });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ success: false, message: "Can't add cart", data: error });
            }
        });
    }
    static updateCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartsId = req.params.id;
            try {
                const findCarts = yield Cart_1.default.findById(cartsId);
                const subtotalPayment = findCarts.subtotal_payment;
                const UpdateCarts = yield Cart_1.default.findByIdAndUpdate(cartsId, {
                    $inc: {
                        quantity: req.body.quantity,
                        subtotal_payment: req.body.quantity * subtotalPayment,
                    },
                }, { new: true });
                res
                    .status(200)
                    .json({ msg: "Update cart was successfully", data: UpdateCarts });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ msg: "Update cart was unsuccessfully", data: error });
            }
        });
    }
    static deleteCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Id = req.params.id;
                const User = req.UserId;
                const CartId = yield Cart_1.default.findById(Id);
                const quantity = CartId.quantity;
                const itemsId = yield Cart_1.default.findById(CartId).select("items");
                const updateStock = yield Product_1.default.findByIdAndUpdate(itemsId.items, {
                    $inc: { stock: quantity },
                });
                const deleteCart = yield Cart_1.default.findByIdAndDelete(CartId);
                res.status(201).json({
                    success: true,
                    message: " Delete cart was successfully",
                    data: deleteCart,
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: " Delete cart was unsuccessfully",
                    data: error,
                });
            }
        });
    }
    static getAllCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idUser = yield req.UserId;
                const allCarts = yield Cart_1.default.find({ users: idUser });
                res.status(200).json({ msg: "This is Carts", data: allCarts });
            }
            catch (error) {
                res.status(500).json({ msg: "Products Not Found", data: error });
            }
        });
    }
    static getCartId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const IdCarts = yield Cart_1.default.findById(req.params.id);
                res.status(200).json({ msg: "This is Carts", data: IdCarts });
            }
            catch (error) {
                res.status(500).json({ msg: "Products Not Found", data: error });
            }
        });
    }
}
exports.default = Cart;
