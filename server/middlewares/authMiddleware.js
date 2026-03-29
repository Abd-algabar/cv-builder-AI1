import jwt from 'jsonwebtoken';
const protect=async(req,res ,next)=>{
    const token=req.headers.authorization;
    // console.log('token='+token)

    if(!token){
        return res.status(401).json({message:'Not authorized, no token'})
    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.userId;
        next();
        
    } catch (error) {
        return res.status(401).json({message:'Not authorized, token failed'})
    }
}


export default protect;