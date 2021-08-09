import mongoose from "mongoose";

export interface IMongooseDefaultProperties extends mongoose.Document {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
}
