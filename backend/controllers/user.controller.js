import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


// register user : /api/user/register

export const registerUser = async (req, res) =>{
    try {
        const  {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message: "All field are require!", success: false});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists", success: false})
        }
        const hashPassword = await bcrypt.hash(password, 10);
           const user = await User.create({
            name,
            email,
            password: hashPassword,
        
        }) ;
         
        const token = jwt.sign({
            id: user._id
        },process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        });

         res.cookie("token", token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",

            sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000, 
         });
             res.json({
                message: "User register successfully!",
                success: true,
                user:{
                    name: user.name,
                    email: user.email,
                },
             })
    } catch (error) {
        res.status(500).User({message: "Internal server error"})
    }
};

// login user : /api/user/login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all the fields", success: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Logged in successfull",
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },token
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// logout user: /api/user/logout

export const logoutUser = async (req, res)=>{
    try {
       res.clearCookie("token",  {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });
     res.status(200).json({
      message: "User Lgged out successfully!", success: true
     })
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error!"
      })
    }

};

// check auth user: /api/user/is-auth

export const isAuthUser = async (req, res) =>{
     try {
         const userId = req.user;
         if(!userId){
          return res.status(401).json({
            message: "Unauthorized", success: false
          })
         }
         const user = await User.findById(userId).select("-password")
         res.json({
           success: true,
           user,
         })
     } catch (error) {
          console.log(error);
      res.status(500).json({
        message: "Internal server error!"
      })
     }
}