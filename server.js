import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/me", userRoutes);

const port = process.env.PORT
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));