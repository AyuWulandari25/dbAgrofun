import { Request, Response } from "express";
import Product from "../models/Product";

class product {
  static async createProduct(req: Request, res: Response) {
    try {
      const newProduct = await Product.create({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        stock: req.body.stock,
        description: req.body.description,
      });
      res.status(201).json({
        success: true,
        msg: "Product create success",
        data: newProduct,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, msg: "Product create unsuccess", data: error });
    }
  }
  static async getAllProduct(req: Request, res: Response) {
    try {
      const allProduct = await Product.find();
      res.status(200).json({ msg: "This is Products", data: allProduct });
    } catch (error) {
      res.status(500).json({ msg: "Products Not Found", data: error });
    }
  }

  static async productId(req: Request, res: Response) {
    try {
      const findCategory = await Product.findById(req.params.id);
      res.status(200).json({ msg: "This is Products", data: findCategory });
    } catch (error) {
      res.status(500).json({ msg: "Products Not Found", data: error });
    }
  }
}

export default product;
