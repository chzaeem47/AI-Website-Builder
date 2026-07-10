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
    password:{
        required:true,
        type:String,
        maxlength: [128, 'Password cannot exceed 128 characters'], 
        minlength: [8, 'Password must be at least 8 characters long']
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
        default:"Free",
    }

},{timestamps:true})

const userModel = mongoose.model("User",userSchema)
export default userModel