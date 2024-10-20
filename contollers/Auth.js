export const register = async (req,res,next) => {
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({
            success:false,
            messsage:"Profile Image Required"
        })
    }
}