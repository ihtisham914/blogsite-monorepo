import express from "express";
import Mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";
import { logOut, signIn } from "./controller/userController.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(cookieParser());

const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
Mongoose.set("strictQuery", true);
Mongoose.connect(DB, {
  useNewUrlParser: true,
}).then(() => {
  console.log("DB connectin successful");
});

// Moutning router on the route
app.use("/api/v1/blogs", blogRouter);
// app.use("/api/v1/users", userRouter);

// loging in admin
app.post("/api/v1/admin/login", signIn);
app.get("/api/v1/admin/logout", logOut);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listing, server started at port: ${port}`);
});
