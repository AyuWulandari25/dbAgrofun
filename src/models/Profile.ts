import mongoose, { Schema } from "mongoose";
import IProfile from "../interfaces/profile";

const profileSchema: Schema = new Schema(
  {
    users: { type: mongoose.Types.ObjectId, ref: "User" },
    first_name: { type: String },
    last_name: { type: String },
    phone_number: { type: String, required: true },
    address: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProfile>("Profile", profileSchema);
