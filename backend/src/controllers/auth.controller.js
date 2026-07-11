import userModel from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

export const googleAuth = async(req,res)=>{

try{

    const {name,email,avatar} = req.body

    if(!email){
        return res.status(400).json({
            message : "Email is Required!"
        })
    }

    let user = await userModel.findOne({email:email})
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user });

  } catch (e) {

    return res.status(500).json({ message: `Login error ${e}` });
  }

};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Signup successful", user });
    
  } catch (e) {
    return res.status(500).json({ message: `Signup error ${e}` });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (e) {
    return res.status(500).json({
      message: `Logout Error ${e.message}`,
    });
  }
};