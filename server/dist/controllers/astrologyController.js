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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.astrologyController = void 0;
const astrologerSchema_1 = require("../model/astrologerSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const astrologyController = () => {
    return {
        adminLogin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = req.body;
                console.log("🚀 ~ file: astrologyController.ts:13 ~ adminLogin:async ~ data:", data);
                if (data.email === String(process.env.ADMIN_USERNAME) &&
                    data.password === String(process.env.ADMIN_PASSWORD)) {
                    let payload = {
                        email: data === null || data === void 0 ? void 0 : data.email,
                    };
                    const accessToken = jsonwebtoken_1.default.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: "1h" });
                    console.log(accessToken, "token");
                    res.cookie("admin_jwt", accessToken, {
                        httpOnly: true,
                    });
                    res.status(200).json({
                        success: true,
                        data,
                        message: "Admin login successful",
                    });
                }
                else {
                    throw new Error("Email or Password not correct");
                }
            }
            catch (error) {
                next(error);
            }
        }),
        astrologerSignup: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = req.body;
                const response = yield astrologerSchema_1.Astrologer.create(data);
                if (response) {
                    res.status(201).json({
                        success: true,
                        data: response,
                        message: "Astrologer created",
                    });
                }
                else {
                    throw new Error("Could not create Astrologer");
                }
            }
            catch (error) {
                next(error);
            }
        }),
        getAstrologers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield astrologerSchema_1.Astrologer.find({});
                if (response) {
                    res.status(200).json({
                        success: true,
                        data: response,
                        message: "Astrologers Found",
                    });
                }
                else {
                    throw new Error("No Astrologers Found");
                }
            }
            catch (error) {
                next(error);
            }
        }),
        getAstrologer: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const response = yield astrologerSchema_1.Astrologer.findById(id);
                if (response) {
                    res.status(200).json({
                        success: true,
                        data: response,
                        message: "Astrologer Found",
                    });
                }
                else {
                    throw new Error("No Astrologers Found");
                }
            }
            catch (error) {
                next(error);
            }
        }),
        editAstrologers: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const _a = req.body, { _id } = _a, rest = __rest(_a, ["_id"]);
                console.log("🚀 ~ file: astrologyController.ts:110 ~ astrologyController ~ rest:", rest);
                const updatedData = yield astrologerSchema_1.Astrologer.findByIdAndUpdate(_id, rest);
                console.log("🚀 ~ file: astrologyController.ts:111 ~ astrologyController ~ updatedData:", updatedData);
                if (updatedData) {
                    const response = yield astrologerSchema_1.Astrologer.find({});
                    res.status(200).json({
                        success: true,
                        data: response,
                        message: "Astrologers Updated",
                    });
                }
                else {
                    throw new Error("No Astrologers Found");
                }
            }
            catch (error) {
                next(error);
            }
        }),
    };
};
exports.astrologyController = astrologyController;
