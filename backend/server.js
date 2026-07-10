import express from "express"
import dotenv from "dotenv";
dotenv.config()
import { connectDB } from "./db/db.js";
import authRouter from './routers/auth.route.js'
import cookieParser from "cookie-parser";
import cors from 'cors'


const port = process.env.PORT || 5000
const app = express();

/**
* MIDDLEWARES
*/
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))

/**
* API MIDDLEWARE
*/
app.use('/api/auth',authRouter)
app.listen(port,()=>{

    console.log("Server is Running on Port ",port)
    connectDB()
})