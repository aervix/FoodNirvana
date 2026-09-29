import express from "express";
import {
  getCurrentUser,
  updateUserLocation,
} from "../controller/user.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const userRoute = express.Router();

userRoute.get("/current", isAuth, getCurrentUser);
userRoute.post("/update-location", isAuth, updateUserLocation);

export default userRoute;
