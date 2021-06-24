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
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class auth {
    constructor() {
        dotenv_1.default.config();
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.body.username;
            const email = req.body.email;
            const password = req.body.password;
            try {
                if (username && email && password) {
                    const newUser = yield User_1.default.create({
                        username: username,
                        email: email,
                        password: bcryptjs_1.default.hashSync(password, 8),
                    });
                    res
                        .status(201)
                        .json({ msg: "Success Create New Account", data: newUser });
                }
                else {
                    res
                        .status(500)
                        .json({ msg: "Please input username, email and password" });
                }
            }
            catch (error) {
                res.status(500).json({ data: error });
                next();
            }
        });
    }
    static login(req, res, next) {
        User_1.default.findOne({ email: req.body.email })
            .then((result) => {
            if (!result) {
                return res.status(401).json({
                    success: false,
                    msg: "Users with this email and password is wrong",
                });
            }
            let passwordIsValid = bcryptjs_1.default.compareSync(req.body.password, result.password);
            if (!passwordIsValid) {
                return res.status(401).json({
                    success: false,
                    msg: "Users with this email and password is wrong",
                });
            }
            let token = jsonwebtoken_1.default.sign({ id: result.id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });
            res.status(200).json({
                message: "Berhasil login",
                data: result,
                AccessToken: token,
            });
        })
            .catch(next);
    }
}
exports.default = auth;
