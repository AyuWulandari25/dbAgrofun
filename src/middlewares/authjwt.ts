import { NextFunction, Response, Request } from "express";
import User from "../models/User";
import { IDecodedToken } from "../interfaces/Decoded";
import dotenv from "dotenv";
import * as jwt from "jsonwebtoken";

class authJWT {
  static async authentication(req: Request, res: Response, next: NextFunction) {
    try {
      // When user doesn't input access token
      if (!req.header("AccessToken")) {
        throw { name: "Missing Access Token" };
      }
      const decoded: any = jwt.verify(
        req.header("AccessToken")!.replace("Bearer ", ""),
        process.env.SECRET_KEY!
      ) as IDecodedToken;
      (<any>req).UserId = decoded.id;
      next();
    } catch (err) {
      return next(err);
    }
  }
  // static authentication(req: Request, res: Response, next: NextFunction) {
  //   const accessToken: any = req.headers.AccessToken;
  //   if (accessToken) {
  //     res.status(200).json({ msg: "Got It", success: true });
  //   } else {
  //     return res
  //       .status(401)
  //       .json({ msg: "Missing Access Token", success: false });
  //   }

  //   const secretKey: string = process.env.SECRET_KEY as string;
  //   jwt.verify(accessToken, secretKey, (err: any, decoded: any) => {
  //     if (err) {
  //       res.status(401).json({ msg: "Invalid token", success: false });
  //     }
  //     (<any>req).UserId = decoded.id;
  //     next();
  //   });
  // }

  static async authorization(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUser = await User.findOne({ _id: (<any>req).UserId });
      console.log(foundUser);

      // User not found, when do query using access token's ID from user model
      if (!foundUser) {
        throw { name: "Access Token not Assosiated" };
      }
      if (String(foundUser._id) === req.params.userID) {
        next();
      } else {
        // When found user's ID not match with user's ID from params
        throw { name: "Forbidden Access" };
      }
    } catch (err) {
      next(err);
    }
  }
}

export default authJWT;
