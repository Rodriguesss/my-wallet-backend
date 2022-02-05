import { MongoClient } from "mongodb"
import dotenv from 'dotenv'

dotenv.config()

export default async function initMongo() {
    const mongoClient = new MongoClient(process.env.URI_MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
    await mongoClient.connect();
    const db = mongoClient.db(process.env.DB_MONGO)
    return db 
}