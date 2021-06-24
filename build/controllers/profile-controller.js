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
const Profile_1 = __importDefault(require("../models/Profile"));
class profile {
    static creatProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, phone_number, address, gender } = req.body;
            try {
                const newProfile = yield Profile_1.default.create({
                    first_name,
                    last_name,
                    phone_number,
                    address,
                    gender,
                    users: req.UserId,
                });
                const updateUser = yield User_1.default.findByIdAndUpdate(req.UserId, { $push: { profiles: newProfile.id } }, { new: true });
                res
                    .status(201)
                    .json({ message: "Profile created successfully", data: newProfile });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Profile created successfully", data: error });
                next(error);
            }
        });
    }
    static updateProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { first_name, last_name, phone_number, address, gender } = req.body;
            const updateData = { first_name, last_name, phone_number, address, gender };
            try {
                const updateProfile = yield Profile_1.default.findByIdAndUpdate(req.params.id, updateData, { new: true });
                res
                    .status(201)
                    .json({ msg: "Profile updated successfully", data: updateProfile });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ msg: "Profile updated unsuccessfully", data: error });
                next(error);
            }
        });
    }
}
exports.default = profile;
