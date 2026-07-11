import mongoose from "mongoose";

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log(
            "Connected To DB"
        )

    }catch(e){
        console.log(
            'Error Occured while connecting to DB',e
        )
    }
}

