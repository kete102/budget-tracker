import express from 'express'
import { registerUser } from '../controllers/auth.controller'
import { verifyAccessToken } from '../middlewares/verifyJWT'

const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', registerUser)
authRouter.post('/logout', registerUser)
authRouter.post('/refresh', verifyAccessToken, registerUser)

export default authRouter

