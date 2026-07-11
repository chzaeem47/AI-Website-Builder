    import jwt from 'jsonwebtoken'
    import userModel from '../models/user.model.js'

    const isAuthUser = async(req,res,next)=>{

        try{
            const token = req.cookies.token
            if(!token){
                return res.status(400).json({
                    messgae : "Token Not Found!"
                })
            }
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await userModel.findById(decoded.id)
            next()
        }catch(e){
            return res.status(500).json({
                message : "Invalid Token!"
            })
        }
    }

    export default isAuthUser