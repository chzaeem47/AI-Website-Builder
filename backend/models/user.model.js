import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        required:true,
        type:String,
    },
    email:{
        required:true,
        type:String,
        unique:true,
    },
    avatar:{
        type:String,

    },
    credits:{
        type:Number,
        default:100,
        min:0
    },
    plan:{
        type:String,
        enum:["Free","Pro","Buisness"],
        default:"free",
    }

},{timestamps:true})

const userModel = mongoose.model("User",userSchema)
export default userModel