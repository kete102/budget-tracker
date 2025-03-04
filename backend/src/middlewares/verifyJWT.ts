import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { processEnv } from "../config";
import { PublicUser } from "../db/schemas/user.schema";
import { AuthRequest } from "./types";

const JWT_ACCESS = processEnv.JWT_SECRET_ACCESS;

export const verifyAccessToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const user = jwt.verify(token, JWT_ACCESS) as PublicUser;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Unauthorized" });
  }
};
