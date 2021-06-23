import mongoose, { Schema } from "mongoose";
import IProduct from "../interfaces/product";

const productSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number },
    image: { type: String },
    stock: { type: Number },
    description: { type: String },
    categorys: { type: mongoose.Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
