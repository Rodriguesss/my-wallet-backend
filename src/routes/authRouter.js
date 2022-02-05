import { Router } from 'express'
import { signUp, signIn } from '../controllers/authController.js'

const authRouter = Router()

authRouter.post("/sign-up", signUp)
authRouter.post("/sign-in", signIn)

export default authRouter