import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("Databse connected successfully"))
        .catch(err=>console.log("Database connection failed"))
}