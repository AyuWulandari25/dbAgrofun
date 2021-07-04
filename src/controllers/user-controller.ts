import { Request, Response, NextFunction } from "express";
import User from "../models/User";

class user {
  static async detailUser(req: Request, res: Response, next: NextFunction) {
    const userId: string = (<any>req).UserId;
    try {
      const IdUsers = await User.findById(userId);
      res.status(200).json({ msg: "This is the Users", data: IdUsers });
    } catch (error) {
      res.status(500).json({ msg: "Users Not Found", data: error });
    }
  }
}

export default user;
