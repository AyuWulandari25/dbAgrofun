import { Document } from "mongoose";

export default interface ICheckout extends Document {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  address: string;
  name_bank: string;
  name_card: string;
  number_card: string;
  cartItem: string;
  total_pesanan: number;
  total_payment: number;
  users: string;
}
