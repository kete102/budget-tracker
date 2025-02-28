import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import { processEnv } from "../config";

const JWT_ACCESS = processEnv.JWT_SECRET_ACCESS

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
	const authHeaders = req.headers.authorization

	if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
		return res.status(401).json({ message: "Unauthorized" })
	}

	const token = authHeaders.split(' ')[1]

	try {

		const isValid = jwt.verify(token, JWT_ACCESS)
		if (!isValid) {
			return res.status(401).json({ error: "Unauthorized" })
		}
		next()
	} catch (error) {
		console.log(error)
		return res.status(401).json({ error: "Unauthorized" })
	}
}

