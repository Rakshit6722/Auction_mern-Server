import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: [3, "Username must contain at least 3 characters"],
        maxLengthL: [40, "Username should be less than 40 characters"],
        required: true
    },
    password: {
        type: String,
        selected: false,
        minLength: [8, "Password must contain at least 3 characters"],
        maxLengthL: [32, "Password should be less than 40 characters"],
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        minLength: [10, "Phone No must contain at least 10 characters"],
        maxLengthL: [10, "Phone No should be less than 10 characters"],
    },
    profieImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    paymentMethods: {
        bankTransfer: {
            bankAccountNumber: String,
            bankAccountName: String,
            bankName: String,
        },
        paypal: {
            paypalEmail: String,
        }
    },
    role: {
        type: "String",
        enum: ["Auctioneer", "Bidder", "Admin"]
    },
    unpaidComission: {
        type: Number,
        default: 0,
    },
    auctionWon: {
        type: Number,
        default: 0,
    },
    moneySpent: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }

})

export default mongoose.model("User", userSchema)   