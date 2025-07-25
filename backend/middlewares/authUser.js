import jwt from 'jsonwebtoken';

export const authUser = async (req, res, next) =>{
    try {
        const {token} = req.cookies;
        if(!token){
              return res.status(401).json({
            message: "Unautherized", success: false
        })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            message: "Unautherized", success: false
        })
    }
} 
export default authUser;