import { Router } from "express";
import cartController from "../controllers/cart-controller";
import authJWT from "../middlewares/authjwt";

class cart {
  router: Router;
  constructor() {
    this.router = Router();
    this.add();
    this.delete();
    this.update();
    this.getAll();
    this.getId();
  }
  public add(): void {
    this.router.post("/add/:id", cartController.addProductToCart);
  }
  public delete(): void {
    this.router.delete("/delete/:id", cartController.deleteCart);
  }
  public update(): void {
    this.router.post("/update/:id", cartController.updateCart);
  }
  public getAll(): void {
    this.router.get("/getall", cartController.getAllCart);
  }
  public getId(): void {
    this.router.get("/:id", cartController.getCartId);
  }
}

export default new cart().router;
