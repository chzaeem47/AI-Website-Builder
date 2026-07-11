import extractJson from "../services/extract.json.response.js"
import generateResponse from "../services/openRouter.js"

export const getCurrUser = async(req,res)=>{

    try{
        if(!req.user){
            return res.json({user:null})
        }
        return res.json(req.user)
    }catch(e){
        return res.status(500).json({
            message : `Get Current User Error ${e}`
        })
    }

}
