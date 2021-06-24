"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
class mongoDB {
    constructor() {
        dotenv_1.default.config();
    }
    connectDB() {
        const connectOption = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        };
        mongoose_1.default.connect(process.env.DB_HOST, connectOption);
        const db = mongoose_1.default.connection;
        db.on("error", console.error.bind(console, "Connection error.."));
        db.once("open", () => {
            console.log("Database connected");
        });
    }
}
exports.default = new mongoDB().connectDB;
