import { Document } from "mongoose";

export default interface ICategory extends Document {
  name: string;
  producId: string;
}
