import express from 'express'
import { loginUser, refreshToken, registerUser } from '../controllers/auth.controller'
import { verifyAccessToken } from '../middlewares/verifyJWT'

const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', verifyAccessToken)
authRouter.post('/refresh', verifyAccessToken, refreshToken)

export default authRouter

