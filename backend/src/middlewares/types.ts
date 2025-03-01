import { Request } from "express";
import { PublicUser } from "../db/schemas/user.schema";

export interface AuthRequest extends Request {
	user?: PublicUser
}

