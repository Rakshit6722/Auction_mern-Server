// import { vs as cloudinaryConnect } from "../config/cloudinary.js"
import ErrorHanlder from "../middleware/error.js"
import User from '../models/User.js'
import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"


dotenv.config()

export const register = async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHanlder("Please full form", 400))
    }

    const { profileImage } = req.files

    const allowedFormats = ["image/png", "image/jpeg", "image/webp"]
    if (!allowedFormats.includes(profileImage.mimetype)) {
        return next(new ErrorHanlder("File format not supported", 400))

    }

    //data in req body
    const {
        userName,
        email,
        password,
        phone,
        address,
        role,
        bankAccountNumber,
        bankAccountName,
        bankName,
        paypalEmail,
    } = req.body

    if (!userName || !email || !password || !phone || !address || !role) {
        return next(new ErrorHanlder("Fill the necessary filds", 400))
    }
    if (role === "Auctioneer") {
        if (!bankAccountName || !bankAccountNumber || !bankName) {
            return next(new ErrorHanlder("Please provide you full bank details", 400))
        }
        if (!paypalEmail) {
            return next(new ErrorHanlder("Plese provide you paypal email", 400))
        }
    }

    const isRegister = await User.findOne({ email })
    if (isRegister) {
        return next(new ErrorHanlder("User already exist, try loggin in", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath, {
        folder: process.env.FOLDER_NAME
    })
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error: ", cloudinaryResponse.error)
        return next(new ErrorHanlder("Failed to upload image to cloudinary", 500))
    }

    const user = await user.create({
        userName,
        email,
        password,
        phone,
        address,
        role,
        profileImage: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
        paymentMethods: {
            bankTransfer: {
                bankAccountNumber,
                bankAccountName,
                bankName,
            },
            paypal: {
                paypalEmail,
            }
        },
    });
    res.status(201).json({
        success: true,
        message: "User Registered"
    })
}