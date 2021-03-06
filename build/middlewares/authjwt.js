"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jwt = __importStar(require("jsonwebtoken"));
class authJWT {
    static authentication(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // When user doesn't input access token
                if (!req.header("AccessToken")) {
                    throw { name: "Missing Access Token" };
                }
                const decoded = jwt.verify(req.header("AccessToken").replace("Bearer ", ""), process.env.SECRET_KEY);
                req.UserId = decoded.id;
                next();
            }
            catch (err) {
                return next(err);
            }
        });
    }
    // static authentication(req: Request, res: Response, next: NextFunction) {
    //   const accessToken: any = req.headers.AccessToken;
    //   if (accessToken) {
    //     res.status(200).json({ msg: "Got It", success: true });
    //   } else {
    //     return res
    //       .status(401)
    //       .json({ msg: "Missing Access Token", success: false });
    //   }
    //   const secretKey: string = process.env.SECRET_KEY as string;
    //   jwt.verify(accessToken, secretKey, (err: any, decoded: any) => {
    //     if (err) {
    //       res.status(401).json({ msg: "Invalid token", success: false });
    //     }
    //     (<any>req).UserId = decoded.id;
    //     next();
    //   });
    // }
    static authorization(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield User_1.default.findOne({ _id: req.UserId });
                console.log(foundUser);
                // User not found, when do query using access token's ID from user model
                if (!foundUser) {
                    throw { name: "Access Token not Assosiated" };
                }
                if (String(foundUser._id) === req.params.userID) {
                    next();
                }
                else {
                    // When found user's ID not match with user's ID from params
                    throw { name: "Forbidden Access" };
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = authJWT;
