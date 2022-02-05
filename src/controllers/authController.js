import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import initMongo from '../database/database.js'

let db = await initMongo()

export async function signUp(req, res) {
  const user = req.body

  const passwordHash = bcrypt.hashSync(user.password, 10)

  await db.collection('users').insertOne({ ...user, password: passwordHash })

  res.sendStatus(201)
}

export async function signIn(req, res) {
  const { email, password } = req.body

  const user = await db.collection('users').findOne({ email })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = uuid()

    await db.collection('sessions').insertOne({ token, userId: user._id })

    res.send(token)
  } else {
    res.sendStatus(401)
  }
}