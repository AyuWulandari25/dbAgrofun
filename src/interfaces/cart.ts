import { Document } from "mongoose";

export default interface ICart extends Document {
  items: string;
  quantity: number;
  subtotal_payment: number;
  users: string;
}
