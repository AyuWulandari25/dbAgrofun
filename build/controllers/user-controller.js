"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
class user {
    static detailUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const userId: string = (<any>req).UserId;
            // try {
            //   const IdUsers = await User.findById(userId);
            //   res.status(200).json({ msg: "This is the Users", data: IdUsers });
            // } catch (error) {
            //   res.status(500).json({ msg: "Users Not Found", data: error });
            // }
            try {
                const userId = yield User_1.default.findById(req.params.id);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    responseStatus: "Status OK",
                    message: "This is the user",
                    data: userId,
                });
            }
            catch (error) {
                return res.json({ error: error });
            }
        });
    }
}
exports.default = user;
