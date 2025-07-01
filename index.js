import express, { urlencoded } from "express";

import dotenv, { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"


dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));
connectDB();

const PORT = process.env.PORT || 3000;


//Routes


app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on Port : ${PORT}`);
});
