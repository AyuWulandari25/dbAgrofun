import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/user";

const userSchema: Schema = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String },
    profiles: { type: mongoose.Types.ObjectId, ref: "Profile" },
    carts: { type: mongoose.Types.ObjectId, ref: "Cart" },
    product_checkouts: { type: mongoose.Types.ObjectId, ref: "Checkout" },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
