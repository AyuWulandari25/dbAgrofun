import { Router } from "express";
import CheckoutController from "../controllers/chekout-controller";
import authJWT from "../middlewares/authjwt";

class checkout {
  router: Router;
  constructor() {
    this.router = Router();
    this.create();
  }
  public create(): void {
    this.router.post("/create", CheckoutController.createOrder);
  }
}

export default new checkout().router;
