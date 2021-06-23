import mongoose, { Schema } from "mongoose";
import ICategory from "../interfaces/category";

const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    productId: { type: mongoose.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", categorySchema);
