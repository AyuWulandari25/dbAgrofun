import { Request, Response, NextFunction } from "express";
import Carts from "../models/Cart";
import Product from "../models/Product";

class Cart {
  static async addProductToCart(req: Request, res: Response) {
    const userId = await (<any>req).UserId;
    const productId = req.params.id;
    const cartsReady: any = await Carts.countDocuments({
      users: userId,
      items: productId,
    });
    const findproduct: any = await Product.findById(productId);
    const priceProduct = findproduct.price;
    const totalprice: any = priceProduct;

    try {
      if (cartsReady == 1) {
        const findIdCart: any = await Carts.findOne({
          users: userId,
          items: productId,
        });
        const cartId = findIdCart.id;

        const UpdateCarts = await Carts.findByIdAndUpdate(
          cartId,
          { $inc: { quantity: 1, subtotal_payment: totalprice } },
          { new: true }
        );
        const updateStockProduct = await Product.findByIdAndUpdate(
          productId,
          {
            $inc: { stock: -1 },
          },
          { new: true }
        );
        res
          .status(200)
          .json({ msg: "Succesfully add product to cart", data: UpdateCarts });
      } else {
        const newCart = await Carts.create({
          users: userId,
          items: productId,
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
      }
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
      const itemsId = await Carts.findById(CartId).select("items");
      const updateStock = await Product.findByIdAndUpdate(itemsId.items, {
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
      const allCarts = await Carts.find();
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
