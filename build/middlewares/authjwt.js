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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
class authJWT {
    static authentication(req, res, next) {
        const accessToken = req.headers.AccessToken;
        if (accessToken) {
            res.status(200).json({ msg: "Got It", success: true });
        }
        else {
            res.status(401).json({ msg: "Missing Access Token", success: false });
        }
        const secretKey = process.env.SECRET_KEY;
        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({ msg: "Invalid token", success: false });
            }
            req.UserId = decoded.id;
            next();
        });
    }
}
exports.default = authJWT;
