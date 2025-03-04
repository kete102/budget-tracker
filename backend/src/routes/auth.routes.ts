import express from "express";
import UserController from "../controllers/auth.controller";
import { verifyAccessToken } from "../middlewares/verifyJWT";

const userRouter = express.Router();

userRouter.get("/check-auth", UserController.checkAuth);
userRouter.get("/overview", verifyAccessToken, UserController.getUserDashboard);
userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser);
userRouter.post("/logout", verifyAccessToken, UserController.logoutUser);
userRouter.post("/refresh", verifyAccessToken, UserController.refreshToken);

export default userRouter;
