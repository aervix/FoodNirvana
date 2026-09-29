import express, { urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import dbConnection from "./db/db.js";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import shopRoute from "./routes/shop.routes.js";
import itemRoute from "./routes/item.routes.js";
import  { dirname } from "path";
import { fileURLToPath } from "url";
import orderRoute from "./routes/order.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

await dbConnection();

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/shop", shopRoute);
app.use("/api/item", itemRoute);
app.use("/api/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Welcome To FoodNirvana Server");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
