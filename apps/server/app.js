import express from "express";
import Mongoose from "mongoose";
import dotenv from "dotenv";
import blogRouter from "./routes/blogRouter.js";
import userRouter from "./routes/userRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);

const DB = process.env.DATABASE.replace("<password>", process.env.DB_PASSWORD);
Mongoose.set("strictQuery", true);
Mongoose.connect(DB, {
  useNewUrlParser: true,
}).then(() => {
  console.log("DB connectin successful");
});

// Moutning router on the route
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/admin", userRouter);
app.use("/api/v1/reviews", reviewRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listing, server started at port: ${port}`);
});
