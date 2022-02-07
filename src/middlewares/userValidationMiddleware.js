import initMongo from "../database/database.js";

export const validationSchema = (schema) => {
	return async (req, res, next) => {
		try {
			console.log(req.body)
			const validation = schema.validate(req.body);

			if (validation.error) {
				console.log(validation)
				return res.sendStatus(422);
			}

			next()
		} catch {
			next()
		}
	}
}

export async function validationEmailExists(req, res, next) {
	let db = await initMongo()
	const emailExists = await db.collection('users').findOne({ email: req.body.email })

	if (emailExists) {
		return res.sendStatus(409)
	}

	next()
}