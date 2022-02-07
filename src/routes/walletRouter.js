import { Router } from 'express'
import { getWallet, postWallet } from '../controllers/walletController.js'
import checkToken from '../middlewares/tokenValidationMiddleware.js'
import { validationSchema } from '../middlewares/userValidationMiddleware.js'
import walletSchema from '../schemas/walletSchama.js'

const walletRouter = Router()

walletRouter.get('/wallets', checkToken, getWallet)
walletRouter.post('/wallet', [checkToken, validationSchema(walletSchema)], postWallet)

export default walletRouter
