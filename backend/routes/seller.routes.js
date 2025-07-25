import mongoose from "mongoose";
import express from 'express'
import {authSeller} from '../middlewares/authSeller.js'
import { isAuthSeller, sellerLogin, sellerLogout } from "../controllers/seller.controller.js";



const router = express.Router();

router.post('/login', sellerLogin);
router.get('/is_auth',authSeller, isAuthSeller);
router.get('/logout',authSeller, sellerLogout);

export default router;
