import { Document, PopulatedDoc } from "mongoose";
import Product from "../models/Product";

export default interface ICart extends Document {
  productid: string;
  items: string[];
  quantity: number;
  subtotal_payment: number;
  users: string;
}
