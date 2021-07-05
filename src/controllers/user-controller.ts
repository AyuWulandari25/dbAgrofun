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
    // try {
    //   const userId = await User.findById(req.params.id);
    //   res.status(200).json({
    //     success: true,
    //     statusCode: 200,
    //     responseStatus: "Status OK",
    //     message: "This is the user",
    //     data: userId,
    //   });
    // } catch (error) {
    //   return res.json({ error: error });
    // }
  }
}

export default user;
