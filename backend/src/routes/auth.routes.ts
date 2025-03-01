import express from 'express'
import AuthController from '../controllers/auth.controller'
import { verifyAccessToken } from '../middlewares/verifyJWT'

const authRouter = express.Router()

authRouter.get('/check-auth', AuthController.checkAuth)
authRouter.post('/register', AuthController.registerUser)
authRouter.post('/login', AuthController.loginUser)
authRouter.post('/logout', verifyAccessToken)
authRouter.post('/refresh', verifyAccessToken, AuthController.refreshToken)

export default authRouter

