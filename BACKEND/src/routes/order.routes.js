import express from "express";

import { isAuth } from "../middlewares/isAuth.js";
import {
  getMyOrders,
  placeOrder,
  updateOrderStatus,
} from "../controller/order.controllers.js";

const orderRoute = express.Router();

orderRoute.post("/place-order", isAuth, placeOrder);
orderRoute.get("/my-orders", isAuth, getMyOrders);
orderRoute.post("/update-order-status",isAuth, updateOrderStatus);

export default orderRoute;
