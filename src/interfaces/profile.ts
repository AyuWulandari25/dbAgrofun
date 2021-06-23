import { Document } from "mongoose";

export default interface IProfile extends Document {
  users: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  gender: string;
}
