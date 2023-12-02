import mongoose from "mongoose";
export const connectDB = async (DB_URI: string) => {
    await mongoose.connect(DB_URI);
    console.log("DB CONNECTED SUCCESSFULY");
};
