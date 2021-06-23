import mongoose, { Schema } from "mongoose";
import ICart from "../interfaces/cart";

const cartSchema: Schema = new Schema(
  {
    items: { type: mongoose.Types.ObjectId, ref: "Product" },
    quantity: { type: Number },
    subtotal_payment: { type: Number },
    users: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<ICart>("Cart", cartSchema);
