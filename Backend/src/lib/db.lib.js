import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database connected", mongoose.connection.host);
    } catch (error) {
        console.log("MongoDB connection error", error);
    }
};