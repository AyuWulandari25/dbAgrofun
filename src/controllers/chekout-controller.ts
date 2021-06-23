import { Response, Request, NextFunction } from "express";
import Cart from "../models/Cart";
import Checkout from "../models/Checkout";

class checkout {
  static async createOrder(req: Request, res: Response) {
    const userId = (<any>req).UserId;
    try {
      const cartsId = await Cart.find({ users: userId });

      const quantitysCarts = await Cart.find({ users: userId }).select(
        "quantity"
      );

      const subtotal_paymentCarts = await Cart.find({ users: userId }).select(
        "subtotal_payment"
      );

      const totalPesanan = quantitysCarts
        .map((bill) => bill.quantity)
        .reduce((acc, bill) => bill + acc);

      const totalpayment = subtotal_paymentCarts
        .map((bill) => bill.subtotal_payment)
        .reduce((acc, bill) => bill + acc);

      const creatCheckout = await Checkout.create({
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
    } catch (error) {
      res.status(200).json({ msg: "Cannot Checkout", data: error });
    }
  }
}

export default checkout;
