import { Router } from "express";
import userController from "../controllers/user-controller";
import authJWT from "../middlewares/authjwt";

class profile {
  router: Router;
  constructor() {
    this.router = Router();
    this.getUserId();
  }

  public getUserId(): void {
    this.router.get(
      "/:id/detail",
      authJWT.authentication,
      userController.detailUser
    );
  }
}

export default new profile().router;
