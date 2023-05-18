import { Router } from "express";
import { signIn, logOut } from "../controller/userController.js";

const userRouter = Router();

userRouter.route("/login").post(signIn);
userRouter.route("/logout").post(logOut);

export default userRouter;
