import { Request, Response, NextFunction } from "express";
import Carts from "../models/Cart";
import Product from "../models/Product";

class Cart {
  static async addProductToCart(req: Request, res: Response) {
    const userId = (<any>req).UserId;
    const productId = req.params.id;
    const findproduct = await Product.findById(productId);
    const priceProduct = findproduct.price;
    const imageProduct = findproduct.image;
    const titleProduct = findproduct.title;
    const totalprice = priceProduct;

    try {
      const detailproduct = await Product.findById(req.params.id);
      const newCart = await Carts.create({
        users: userId,
        productid: productId,
        items: [priceProduct, imageProduct, titleProduct],
        quantity: +1,
        subtotal_payment: totalprice,
      });
      const StockProduct = await Product.findByIdAndUpdate(
        productId,
        {
          $inc: { stock: -1 },
        },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Success add to new cart!",
        data: newCart,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Can't add cart", data: error });
    }
  }

  static async updateCart(req: Request, res: Response) {
    const cartsId = req.params.id;
    try {
      const findCarts = await Carts.findById(cartsId);
      const subtotalPayment = findCarts.subtotal_payment;
      const UpdateCarts = await Carts.findByIdAndUpdate(
        cartsId,
        {
          $inc: {
            quantity: req.body.quantity,
            subtotal_payment: req.body.quantity * subtotalPayment,
          },
        },
        { new: true }
      );
      res
        .status(200)
        .json({ msg: "Update cart was successfully", data: UpdateCarts });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Update cart was unsuccessfully", data: error });
    }
  }

  static async deleteCart(req: Request, res: Response) {
    try {
      const Id = req.params.id;
      const User = (<any>req).UserId;
      const CartId = await Carts.findById(Id);
      const quantity = CartId.quantity;
      const itemsId = await Carts.findById(CartId).select("productid");
      const updateStock = await Product.findByIdAndUpdate(itemsId.productid, {
        $inc: { stock: quantity },
      });
      const deleteCart = await Carts.findByIdAndDelete(CartId);
      res.status(201).json({
        success: true,
        message: " Delete cart was successfully",
        data: deleteCart,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: " Delete cart was unsuccessfully",
        data: error,
      });
    }
  }
  static async getAllCart(req: Request, res: Response) {
    try {
      const idUser = await (<any>req).UserId;
      const allCarts = await Carts.find({ users: idUser });
      res.status(200).json({ msg: "This is Carts", data: allCarts });
    } catch (error) {
      res.status(500).json({ msg: "Products Not Found", data: error });
    }
  }
  static async getCartId(req: Request, res: Response) {
    try {
      const IdCarts = await Carts.findById(req.params.id);
      res.status(200).json({ msg: "This is Carts", data: IdCarts });
    } catch (error) {
      res.status(500).json({ msg: "Products Not Found", data: error });
    }
  }
}

export default Cart;
