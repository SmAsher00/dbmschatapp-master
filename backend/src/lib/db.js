import mongoose from 'mongoose';

export const connectDB = async()=>{
    try {
        if (!process.env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in environment variables");
            console.error("Please create a .env file in the backend folder with MONGODB_URI");
            return;
        }
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
    }
};