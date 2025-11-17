import express from 'express';
import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';
import dotenv from "dotenv";
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

app.listen(PORT,()=>{
    console.log("server is running at port:"+ PORT);
    connectDB()
});