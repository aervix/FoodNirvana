import express from "express";
import { createShop, getShop, getShopsByCity } from "../controller/shop.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.middlewares.js";

const shopRoute = express.Router();

shopRoute.post("/create-shop", isAuth, upload.single("shopImg"), createShop);
shopRoute.get("/get-shop", isAuth, getShop);
shopRoute.post("/get-shop-by-city", isAuth, getShopsByCity);

export default shopRoute;
