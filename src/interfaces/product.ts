import { Document } from "mongoose";

export default interface IProduct extends Document {
  title: string;
  price: number;
  image: string;
  stock: number;
  description: string;
  categorys: string;
}
