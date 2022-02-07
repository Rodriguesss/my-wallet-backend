import joi from 'joi'

const userRegisterSchema = joi.object({
	name: joi.string().min(2).max(20).required(),
	email: joi.string().email().required(),
	password: joi.string().min(3).max(15).required(),
	password_confirmation: joi.any().valid(joi.ref('password')).required()
})

const userLoginSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().min(3).max(15).required(),
});

export { 
	userRegisterSchema,
	userLoginSchema
}