import { Router, Application, Request, Response } from "express";
import express from "express";
import Routes from "./routes/index";
import dotenv from "dotenv";
import MongoDB from "./config/db";
import cors from "cors";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.plugin();
    this.router();
    dotenv.config();
  }

  protected plugin(): void {
    this.app.use(cors({ origin: "http://localhost:4200/" }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    MongoDB();
  }

  protected router(): void {
    this.app.use(Routes);
  }
}

export default new App().app;
