import { ObjectId, Types } from "mongoose";


export interface AstrologerEntity {
    _id: Types.ObjectId,
    name: string;
    email: string;
    password:string;
    gender: string;
    languages?: string[];
    specialities?: string[];
    profileImageUrl: string;
}


