import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import walletRouter from './src/routes/walletRouter.js'
import authRouter from './src/routes/authRouter.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

app.use([walletRouter, authRouter])

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta: ${process.env.PORT}`)
})