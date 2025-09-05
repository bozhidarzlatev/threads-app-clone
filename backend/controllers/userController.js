import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookies from "../utils/generateTokenAndSetCookies.js";
import { v2 as cloudinary } from "cloudinary"
import mongoose from "mongoose";
import Post from "../models/postModel.js";

const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

        const user = await User.findOne({ $or: [{ email }, { username }] })

        if (user) {
            return res.status(400).json({ error: "User/email already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
        });

        await newUser.save();

        if (newUser) {
            generateTokenAndSetCookies(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                profilePic: "",
                bio:  ""

            })
        } else {
            res.status(400).json({ error: 'Invaid user data!' })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in signupUser: `, error.message);

    }
}

const loginUser = async (req, res) => {

    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordCorrect) return res.status(400).json({ error: "Invalid username or password" })

        generateTokenAndSetCookies(user._id, res);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            profilePic: user.profilePic,
            bio: user.bio
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in loginUser: `, error.message);

    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 })
        res.status(200).json({ message: 'User logged out successfully!' })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in logoutUser: `, error.message);

    }
}


const followUser = async (req, res) => {
    
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) return res.status(400).json({ error: "You cannot follow/unfollow yourself!" });
        if (!userToModify || !currentUser) return res.status(404).json({ error: "User not found!" });

        const isFollowing = currentUser.following.includes(id);

        if (isFollowing) {
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            res.status(200).json({ message: "User unfollowed successfully!" });

        } else {
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            res.status(200).json({ message: "User followed successfully!" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in followtUser: `, error.message);

    }
}


const updateUser = async (req, res) => {

    const { name, email, username, password, bio } = req.body;
    let { profilePic } = req.body
    const userId = req.user._id;

    try {

        let user = await User.findById(userId)
        if (!user) return res.status(400).json({ error: "User not found!" })

        if (req.params.id !== userId.toString()) return res.status(400).json({ error: `You can't update other profiles` })

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword
        }

        
        if (profilePic) {
            
            if (user.profilePic) {
                
                const delRes = await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0]);
            }
            const uploadedRes = await cloudinary.uploader.upload(profilePic);
            
            profilePic = uploadedRes.secure_url;
        }

        
        
        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.profilePic = profilePic || user.profilePic
        user.bio = bio || user.bio
        
        user = await user.save();

        await Post.updateMany(
            {"replies.userId": userId},
            {
                $set:{
                    "replies.$[reply].username": user.username,
                    "replies.$[reply].userProfilePic": user.profilePic

                }
            },
            {arrayFilters: [{"reply.userId":userId}]}
        )

    

        res.status(200).json({ message: "Profile updated successfully", user })
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in updatetUser: `, error.message);
    }

}


const getUserProfile = async (req, res) => {
    const { query } = req.params;
    try {
        let user;
        if(mongoose.Types.ObjectId.isValid(query)){
            
            user = await User.findOne({ _id: query }).select("-password").select("-updatedAt");
        } else {
            user = await User.findOne({ username: query }).select("-password").select("-updatedAt");
        }

        if (!user) return res.status(400).json({ error: "user not found!" })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in getUserProfile : `, error.message);
    }
}

export const userController = {
    signupUser,
    loginUser,
    logoutUser,
    followUser,
    updateUser,
    getUserProfile
};