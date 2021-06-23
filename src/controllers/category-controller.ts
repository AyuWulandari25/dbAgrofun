import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";
import Product from "../models/Product";

class category {
  static async createCategory(req: Request, res: Response) {
    try {
      const newCategory = await Category.create({
        name: req.body.name,
      });
      res
        .status(201)
        .json({ msg: "Category create success", data: newCategory });
    } catch (error) {
      res.status(500).json({ msg: "Category create unsuccess", data: error });
    }
  }
  static async getAllCategory(req: Request, res: Response) {
    try {
      const allCategory = await Category.find();
      res.status(200).json({ msg: "This is Categorys", data: allCategory });
    } catch (error) {
      res.status(500).json({ msg: "Categorys Not Found", data: error });
    }
  }

  static async categoryId(req: Request, res: Response) {
    try {
      const findCategory = await Category.findById(req.params.id);
      res.status(200).json({ msg: "This is Categorys", data: findCategory });
    } catch (error) {
      res.status(500).json({ msg: "Categorys Not Found", data: error });
    }
  }
}

export default category;
