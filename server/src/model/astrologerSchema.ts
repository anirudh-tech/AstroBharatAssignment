import { Schema, model } from "mongoose";
import { AstrologerEntity } from "../entity/astrologerEntity";

const AstrologerSchema = new Schema ({ 
    name:{
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
})

export const Astrologer = model<AstrologerEntity>("astrologers",AstrologerSchema)