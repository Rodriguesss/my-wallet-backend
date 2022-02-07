import initMongo from "../database/database.js"
import { stripHtml } from "string-strip-html"

let db = await initMongo()

export async function getWallet(req, res) {
    try {
        const { _id } = res.locals.user

        const wallets = await db.collection('wallets').find({ user_id: _id }).toArray()

        res.send(wallets)
    } catch {
        res.sendStatus(500)
    }
}

export async function postWallet(req, res) {
    const wallet = req.body

    wallet.description = stripHtml(wallet.description).result.trim()
    wallet.operation = stripHtml(wallet.operation).result.trim()
    wallet.price = stripHtml(wallet.price).result.trim()

    try {
        const { _id } = res.locals.user

        await db.collection('wallets').insertOne({ ...wallet, date: Date.now(), user_id: _id })

        res.sendStatus(`201`)
    } catch {
        res.sendStatus(500)
    }
}