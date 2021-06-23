import mongoose, { Schema } from "mongoose";

import ICheckout from "../interfaces/checkout";

const checkoutSchema: Schema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    username: { type: String },
    email: { type: String },
    address: { type: String },
    name_bank: { type: String },
    name_card: { type: String },
    number_card: { type: String },
    cartItem: [{ type: mongoose.Types.ObjectId, ref: "Cart" }],
    total_pesanan: { type: Number },
    total_payment: { type: Number },
    users: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<ICheckout>("Checkout", checkoutSchema);
