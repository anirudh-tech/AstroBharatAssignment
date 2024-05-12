"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Astrologer = void 0;
const mongoose_1 = require("mongoose");
const AstrologerSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        default: "user"
    },
    languages: [{
            type: String
        }],
    specialities: [{
            type: String,
            default: "active"
        }],
    profileImageUrl: {
        type: String,
    }
}, {
    timestamps: true
});
exports.Astrologer = (0, mongoose_1.model)("astrologers", AstrologerSchema);
