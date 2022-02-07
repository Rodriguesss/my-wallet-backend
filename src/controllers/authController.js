import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import initMongo from '../database/database.js'
import { stripHtml } from "string-strip-html"

let db = await initMongo()

export async function signUp(req, res) {
  const user = req.body
  
  user.email = stripHtml(user.email).result.trim()
  user.name = stripHtml(user.name).result.trim()
  user.password = stripHtml(user.password).result

  try {
    const passwordHash = bcrypt.hashSync(user.password, 10)

    delete user.password_confirm

    await db.collection('users').insertOne({ ...user, password: passwordHash })

    res.sendStatus(201)
  } catch {
    res.sendStatus(500)
  }
}

export async function signIn(req, res) {
  let { email, password } = req.body

  email = stripHtml(email).result.trim()
  password = stripHtml(password).result

  try {
    const user = await db.collection('users').findOne({ email })

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid()

      delete user.password
      delete user.password_confirm

      await db.collection('sessions').insertOne({ token, userId: user._id })

      return res.send({token, user}).sendStatus(200)
    }

    return res.sendStatus(404)
  } catch {
    res.sendStatus(500)
  }
}