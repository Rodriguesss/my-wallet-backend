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

export async function postRegistry(req, res) {
    const registry = req.body

    registry.description = stripHtml(registry.description).result.trim()
    registry.operation = stripHtml(registry.operation).result.trim()
    registry.price = stripHtml(registry.price).result.trim()

    try {
        const month = new Date().getMonth()
        const day = new Date().getDate()

        const { _id } = res.locals.user

        registry.price = parseInt(registry.price).toLocaleString('pt-br', {minimumFractionDigits: 2})

        await db.collection('wallets').insertOne({ ...registry, date: `${day}/${month < 10 ? `0` : ``}${month + 1}`, user_id: _id })

        res.sendStatus(`201`)
    } catch {
        res.sendStatus(500)
    }
}