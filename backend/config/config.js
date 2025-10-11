import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv()

export const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";
export const JWT_EXPIRES = "1h";
export const MONGO_URI = process.env.MONGO_URL || "mongodb://localhost:27017/mydb";

export const connectDB = async()=>{
    try {
     await mongoose.connect(process.env.MONGO_URL)
     console.log("DataBase connected")


        
    } catch (error) {
        console.log(error)
        
    }
}