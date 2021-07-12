import { Router, Request, Response } from "express";
import authRoutes from "../routes/auth.routes";
import productRoutes from "../routes/product";
import categoryRoutes from "../routes/category";
import cartRoutes from "../routes/cart";
import checkoutRoutes from "../routes/checkout";
import userRoutes from "../routes/user";
import authJWT from "../middlewares/authjwt";

class Routes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
    this.auth();
    this.product();
    this.authJWT();
    this.category();
    this.cart();
    this.checkout();
    this.user();
  }

  public routes(): void {
    this.router.get("/", (req: Request, res: Response) => {
      res.status(200).json({ msg: "Welcome in AgroFun" });
    });
  }
  public authJWT(): void {
    this.router.use(authJWT.authentication);
  }
  public auth(): void {
    this.router.use("", authRoutes);
  }
  public user(): void {
    this.router.use("/user", userRoutes);
  }
  public product(): void {
    this.router.use("/product", productRoutes);
  }
  public category(): void {
    this.router.use("/category", categoryRoutes);
  }
  public cart(): void {
    this.router.use("/cart", cartRoutes);
  }

  public checkout(): void {
    this.router.use("/checkout", checkoutRoutes);
  }
}

export default new Routes().router;
