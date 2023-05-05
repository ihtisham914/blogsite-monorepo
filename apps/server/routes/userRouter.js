import { Router } from "express";
import { createuserdata } from "../controller/userController.js";

const userRouter = Router();

// get all products
userRouter.route("/").post(createuserdata);

export default userRouter;
