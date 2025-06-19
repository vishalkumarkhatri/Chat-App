import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";



export const signup = async (req, res) => {

    const { name, email, password, profilePic } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).send("All fields are required")
        }
        if (password.length < 8) {
            return res.status(400).send("Password must be at least 8 characters long")
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, email, password: hashedPassword, profilePic });

        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).send("User not created")
        }

    } catch (error) {
        console.log("Error in signup", error);
        res.status(400).send(error.message)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        if (user) {
            // generate jwt token
            generateToken(user._id, res);
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            })
        }
    } catch (error) {
        console.log("Error in login", error);
        res.status(400).json({message: "Internal server error"})
        
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development" ? false : true,
            sameSite: "strict",
            expires: new Date(0)
        })
        res.status(200).json({message: "Logout successful"})
    } catch (error) {
        console.log("Error in logout", error);
        res.status(400).json({message: "Internal server error"})
    }
}

export const updateProfile = async (req, res) => {
    const { profilePic } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(400).json({message: "User not found"});
        }
        
        if(!profilePic) {
            return res.status(400).json({message: "Profile picture is required"});
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {profilePic: uploadResponse.url}, {new: true});


        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("Error in updateProfilePic", error);
        res.status(400).json({message: "Internal server error"})
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth", error);
        res.status(400).json({message: "Internal server error"})
    }
}