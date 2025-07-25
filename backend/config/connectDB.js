import mongoose, {mongo} from "mongoose";

export const connectDB = async () =>{
     
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected!");

    } catch (error) {
        console.error("Enter connecting to MongoDB:", error);
        process.exit(1);
    }
}
