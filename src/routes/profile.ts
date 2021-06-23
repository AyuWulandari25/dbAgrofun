import { Router } from "express";
import profileController from "../controllers/profile-controller";
import authJWT from "../middlewares/authjwt";

class profile {
  router: Router;
  constructor() {
    this.router = Router();
    this.create();
  }
  public create(): void {
    this.router.post(
      "/create",
      authJWT.authentication,
      profileController.creatProfile
    );
  }
  public update(): void {
    this.router.post(
      "/update",
      authJWT.authentication,
      profileController.updateProfile
    );
  }
}

export default new profile().router;
