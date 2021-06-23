import mongoose from "mongoose";
import dotenv from "dotenv";

class mongoDB {
  constructor() {
    dotenv.config();
  }
  public connectDB(): void {
    const connectOption = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };

    mongoose.connect(process.env.DB_HOST as string, connectOption);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Connection error.."));
    db.once("open", () => {
      console.log("Database connected");
    });
  }
}

export default new mongoDB().connectDB;
