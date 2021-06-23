import { NextFunction, Response, Request } from "express";
import User from "../models/User";
import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

class authJWT {
  static authentication(req: Request, res: Response, next: NextFunction) {
    const accessToken: any = req.headers.accesstoken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ msg: "Missing Access Token", success: false });
    }

    const secretKey: string = process.env.SECRET_KEY as string;
    jwt.verify(accessToken, secretKey, (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ msg: "Invalid token", success: false });
      }
      (<any>req).UserId = decoded.id;
      next();
    });
  }
}

export default authJWT;
