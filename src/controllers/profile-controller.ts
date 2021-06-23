import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import Profile from "../models/Profile";

class profile {
  static async creatProfile(req: Request, res: Response, next: NextFunction) {
    const { first_name, last_name, phone_number, address, gender } = req.body;

    try {
      const newProfile = await Profile.create({
        first_name,
        last_name,
        phone_number,
        address,
        gender,
        users: (<any>req).UserId,
      });
      const updateUser = await User.findByIdAndUpdate(
        (<any>req).UserId,
        { $push: { profiles: newProfile.id } },
        { new: true }
      );
      res
        .status(201)
        .json({ message: "Profile created successfully", data: newProfile });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Profile created successfully", data: error });
      next(error);
    }
  }
  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    const { first_name, last_name, phone_number, address, gender } = req.body;
    const updateData = { first_name, last_name, phone_number, address, gender };

    try {
      const updateProfile = await Profile.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );
      res
        .status(201)
        .json({ msg: "Profile updated successfully", data: updateProfile });
    } catch (error) {
      res
        .status(500)
        .json({ msg: "Profile updated unsuccessfully", data: error });
      next(error);
    }
  }
}

export default profile;
