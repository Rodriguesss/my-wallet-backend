import { Router } from 'express'
import { getWallet, postRegistry } from '../controllers/walletController.js'
import checkToken from '../middlewares/tokenValidationMiddleware.js'
import { validationSchema } from '../middlewares/userValidationMiddleware.js'
import walletSchema from '../schemas/walletSchama.js'

const walletRouter = Router()

walletRouter.get('/wallet', checkToken, getWallet)
walletRouter.post('/registry', [checkToken, validationSchema(walletSchema)], postRegistry)

export default walletRouter
