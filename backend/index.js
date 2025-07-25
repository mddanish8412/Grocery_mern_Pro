import express from 'express';
import cors from 'cors';
import  Dotenv  from 'dotenv';
Dotenv.config();
import cookieParser from 'cookie-parser';
import { connectDB } from './config/connectDB.js';
import productRoutes from './routes/product.routes.js'
import userRoutes from './routes/user.routes.js';
import sellerRoutes from './routes/seller.routes.js';
import cartRoutes from './routes/cart.routes.js';
import OrderRoutes from './routes/order.routes.js'
import addressRoutes from './routes/address.routes.js'
import { connectCloudinary } from './config/cloudinary.js';

const app = express();
connectDB();
connectCloudinary();
const allowedOrigins = ["http://localhost:5173"];
// midlewares
app.use(cors({origin:allowedOrigins, credentials: true}));
app.use(cookieParser());
app.use(express.json());

// api  Endpoint

app.use("/images", express.static("uploads"));
app.use("/api/user", userRoutes);
app.use("/api/seller",sellerRoutes );
app.use("/api/product",productRoutes );
app.use("/api/cart",cartRoutes );
app.use("/api/order",OrderRoutes );
app.use("/api/address",addressRoutes );
const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    //connectDB();
    console.log(`Server is running on port http://localhost:${PORT}`);
});