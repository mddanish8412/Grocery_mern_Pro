import jwt from 'jsonwebtoken';

export const authSeller = async (req, res,next) =>{
    try {
        const {sellerToken} = req.cookies;
        if(!sellerToken){
              return res.status(401).json({
            message: "Unautherized", success: false
        })
        }
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if(decoded.email === process.env.SELLER_EMAIL)
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            message: "Unautherized", success: false
        })
    }
} 