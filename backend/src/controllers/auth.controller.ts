import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../lib/generateJWT";
import { loginSchema, registerSchema, UserModel } from "../models/user.model";
import { processEnv } from "../config";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { PublicUser, User } from "../db/schemas/user.schema";

const JWT_REFRESH = processEnv.JWT_SECRET_REFRESH;

class AuthController {
  static async registerUser(req: Request, res: Response) {
    const { email, username, password } = req.body;
    //NOTE: Validate the body
    const validation = registerSchema.safeParse({
      email,
      username,
      password,
    });

    if (!validation.success) {
      console.log(validation.error.message.toString());
      return res.status(400).json({ message: "Fields validation error" });
    }

    const user = await UserModel.create({ email, username, password });

    //NOTE: Crear jwt acccesToken
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: processEnv.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  }

  static async refreshToken(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken)
        return res.status(401).json({ message: "Unauthorized" });

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: VerifyErrors, user: User) => {
          if (err) return res.status(403).json({ message: "Invalid token" });

          const newAccessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            username: user.username,
          });

          const newRefreshToken = generateRefreshToken({
            id: user.id,
            email: user.email,
            username: user.username,
          });

          res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          return res.status(200).json({ newAccessToken });
        },
      );
    } catch (error) {
      console.log("Refresh Token error: ", error);
      res.clearCookie("refresh_token");
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  }
  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;
    //NOTE: Validate the body
    const validation = loginSchema.safeParse({
      email,
      password,
    });

    if (!validation.success) {
      console.log(validation.error.message.toString());
      return res.status(400).json({ message: "Fields validation error" });
    }

    const user = await UserModel.login({ email, password });

    //NOTE: Crear jwt acccesToken
    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: processEnv.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ accessToken });
  }

  static async logoutUser(req: Request, res: Response) {
    console.log("logout");
    try {
      if (!req.cookies.refresh_token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: processEnv.NODE_ENV === "production",
        sameSite: "strict",
      });
      return res.json({ message: "logged out" });
    } catch (error) {
      console.log("Logout error: ", error);
      return res.status(500).json({ message: "Logout failed" });
    }
  }

  static async checkAuth(req: Request, res: Response) {
    const refreshToken = req.cookies?.refresh_token; // Accede al refresh token desde las cookies

    if (!refreshToken) {
      console.log("No refresh token provided");
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      //NOTE: check refresh token
      const user = jwt.verify(refreshToken, JWT_REFRESH) as PublicUser;

      //NOTE: if refresh token is valid, generate new access token
      const newAccessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        username: user.username,
      });

      //NOTE: send the new access token to the client
      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error("Refresh token error:", error);
      return res.status(403).json({ message: "Unauthorized" });
    }
  }
}

export default AuthController;
