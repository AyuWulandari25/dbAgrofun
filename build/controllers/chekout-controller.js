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
const Checkout_1 = __importDefault(require("../models/Checkout"));
class checkout {
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.UserId;
            try {
                const cartsId = yield Cart_1.default.find({ users: userId });
                const quantitysCarts = yield Cart_1.default.find({ users: userId }).select("quantity");
                const subtotal_paymentCarts = yield Cart_1.default.find({ users: userId }).select("subtotal_payment");
                const totalPesanan = quantitysCarts
                    .map((bill) => bill.quantity)
                    .reduce((acc, bill) => bill + acc);
                const totalpayment = subtotal_paymentCarts
                    .map((bill) => bill.subtotal_payment)
                    .reduce((acc, bill) => bill + acc);
                const creatCheckout = yield Checkout_1.default.create({
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    username: req.body.username,
                    email: req.body.email,
                    address: req.body.address,
                    name_bank: req.body.namebank,
                    name_card: req.body.namecard,
                    number_card: req.body.numbercard,
                    cartItem: cartsId,
                    total_pesanan: totalPesanan,
                    total_payment: totalpayment,
                    users: userId,
                });
                res
                    .status(201)
                    .json({ msg: "checkouts has successfully", data: creatCheckout });
            }
            catch (error) {
                res.status(200).json({ msg: "Cannot Checkout", data: error });
            }
        });
    }
}
exports.default = checkout;
