import { Router } from "express";
import userController from "../controllers/user-controller";

class user {
  router: Router;
  constructor() {
    this.router = Router();
    this.getUserId();
  }

  public getUserId(): void {
    this.router.get("/:id/detail", userController.detailUser);
  }
}

export default new user().router;
