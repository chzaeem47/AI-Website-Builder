import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({

    role:{
        type:String,
        enum:["Ai","User"],
        required:true
    },

    content:{
        type:String,
        required:true
    }

},{timestamps:true})

const websiteSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    title:{
        type:String,
        default:"Untitled"
    },

    latestCode:{
        type:String,
        required:true,
    },

    conversation:[
        messageSchema
    ],

    deployed:{
        type:Boolean,
        default:false
    },

    deployURL:{
        type:String
    },

    slug:{
        type:String,
        unique:true
    },

},{timestamps:true})


const websiteModel = mongoose.model("Website" , websiteSchema)
export default websiteModel