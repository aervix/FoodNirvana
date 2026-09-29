import express from "express";
import {
  createItem,
  deleteItem,
  editItem,
  getAllItems,
  getItemByCity,
} from "../controller/items.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.middlewares.js";

const itemRoute = express.Router();

itemRoute.get("/get-all-items", getAllItems);
itemRoute.post("/add-item", isAuth, upload.single("itemImg"), createItem);
itemRoute.post(
  "/update-item/:itemId",
  isAuth,
  upload.single("itemImg"),
  editItem
);
itemRoute.post("/delete-item", isAuth, deleteItem);
itemRoute.post("/get-items-by-city", isAuth, getItemByCity);

export default itemRoute;
