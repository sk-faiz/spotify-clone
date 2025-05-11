import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId);
        req.token = decoded.sToken
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

export default authenticateUser;