import { Router, Request, Response } from "express";
import productController from "../controllers/product-controller";
import authJWT from "../middlewares/authjwt";

class product {
  router: Router;
  constructor() {
    this.router = Router();
    this.create();
    this.getAll();
    this.getId();
  }
  public create(): void {
    this.router.post("/create", productController.createProduct);
  }
  public getAll(): void {
    this.router.get("/allproduct", productController.getAllProduct);
  }
  public getId(): void {
    this.router.get("/:id", productController.productId);
  }
}

export default new product().router;
