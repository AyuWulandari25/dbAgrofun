import { Router } from "express";
import categoryController from "../controllers/category-controller";

class category {
  router: Router;
  constructor() {
    this.router = Router();
    this.create();
    this.getAll();
    this.getId();
  }
  public create(): void {
    this.router.post("/create", categoryController.createCategory);
  }
  public getAll(): void {
    this.router.post("/allcategory", categoryController.getAllCategory);
  }
  public getId(): void {
    this.router.post("/categoryId", categoryController.categoryId);
  }
}

export default new category().router;
