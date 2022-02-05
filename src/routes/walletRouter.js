import { Router } from 'express'
import { getWallet, postWallet } from '../controllers/walletController.js'
import checkToken from '../middlewares/tokenValidationMiddleware.js'

const walletRouter = Router()

walletRouter.get('/wallets', checkToken, getWallet)
walletRouter.post('/wallet', checkToken, postWallet)

export default walletRouter
