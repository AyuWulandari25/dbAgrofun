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
const Category_1 = __importDefault(require("../models/Category"));
class category {
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = yield Category_1.default.create({
                    name: req.body.name,
                });
                res
                    .status(201)
                    .json({ msg: "Category create success", data: newCategory });
            }
            catch (error) {
                res.status(500).json({ msg: "Category create unsuccess", data: error });
            }
        });
    }
    static getAllCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCategory = yield Category_1.default.find();
                res.status(200).json({ msg: "This is Categorys", data: allCategory });
            }
            catch (error) {
                res.status(500).json({ msg: "Categorys Not Found", data: error });
            }
        });
    }
    static categoryId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findCategory = yield Category_1.default.findById(req.params.id);
                res.status(200).json({ msg: "This is Categorys", data: findCategory });
            }
            catch (error) {
                res.status(500).json({ msg: "Categorys Not Found", data: error });
            }
        });
    }
}
exports.default = category;
