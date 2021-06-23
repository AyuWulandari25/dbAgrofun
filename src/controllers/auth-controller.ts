import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

class auth {
  constructor() {
    dotenv.config();
  }
  static async register(req: Request, res: Response, next: NextFunction) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
      if (username && email && password) {
        const newUser = await User.create({
          username: username,
          email: email,
          password: bcryptjs.hashSync(password, 8),
        });
        res
          .status(201)
          .json({ msg: "Success Create New Account", data: newUser });
      } else {
        res
          .status(500)
          .json({ msg: "Please input username, email and password" });
      }
    } catch (error) {
      res.status(500).json({ data: error });
      next();
    }
  }

  static login(req: Request, res: Response, next: NextFunction) {
    User.findOne({ email: req.body.email })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            success: false,
            msg: "Users with this email and password is wrong",
          });
        }
        let passwordIsValid = bcryptjs.compareSync(
          req.body.password,
          result.password
        );
        if (!passwordIsValid) {
          return res.status(401).json({
            success: false,
            msg: "Users with this email and password is wrong",
          });
        }
        let token = jwt.sign(
          { id: result.id },
          process.env.SECRET_KEY as string,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          message: "Berhasil login",
          data: result,
          AccessToken: token,
        });
      })
      .catch(next);
  }
}

export default auth;
