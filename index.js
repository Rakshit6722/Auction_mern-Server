import express from "express"
import { dbConnect } from "./config/database.js"
import dotenv from 'dotenv'
import cors from "cors"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())
app.use(fileUpload())

dbConnect()


//default route
app.get('/', (req, res) => {
    // res.send("Working properly")
    res.status(202).json({
        success: true,
        message: "Server is up running"
    })
    console.log("GET request")
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

