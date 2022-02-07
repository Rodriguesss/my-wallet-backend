import { Router } from 'express'
import { signUp, signIn } from '../controllers/authController.js'
import { validationEmailExists, validationSchema } from '../middlewares/userValidationMiddleware.js'
import { userRegisterSchema, userLoginSchema } from '../schemas/userSchema.js'

const authRouter = Router()

authRouter.post("/sign-up", [validationSchema(userRegisterSchema), validationEmailExists], signUp)
authRouter.post("/sign-in", validationSchema(userLoginSchema), signIn)

export default authRouter