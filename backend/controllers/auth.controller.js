import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';

export const googleAuth = async(req,res)=>{

try{

    const {name,email,avatar} = req.body

    if(!email){
        return res.status(400).json({
            message : "Email is Required!"
        })
    }

    const user = await userModel.findOne({email:email})
    if(!user){
        user=await userModel.create({name,email,avatar})
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge:7*24*60*60*1000,

    })

    return res.status(200).json({
        message : "User Created Successfully",
        user
    })

 }catch(e){
    return res.status(500).json({
        message : `Google Auth Error ${e}`
    })
 }

}

export const logout = async(req,res)=>{

    try{
        return res.clearCookie("token",{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
        })
    }catch(e){
        return res.status(500).json({
            message : `Logout Error ${e}`
        })
    }
}