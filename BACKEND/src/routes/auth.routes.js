import express from "express";
import { googleAuth, login, logout, resetPassword, sendOtp, signUp, verifyOtp } from "../controller/auth.controllers.js";

const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/login", login);
authRoute.get("/logout", logout);

// password reset routes
authRoute.post("/send-otp", sendOtp);
authRoute.post("/verify-otp", verifyOtp);
authRoute.post("/reset-password", resetPassword);
authRoute.post("/google-auth", googleAuth);

export default authRoute;
