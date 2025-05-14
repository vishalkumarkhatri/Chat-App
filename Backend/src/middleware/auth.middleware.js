import jwt from "jsonwebtoken";
import User from "../models/user.model.js";



export const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - Token not found" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protectRoutes", error);
        res.status(401).json({ message: "Unauthorized - Invalid token" });

    }
};