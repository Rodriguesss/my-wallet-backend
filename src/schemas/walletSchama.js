import joi from 'joi'

const walletSchema = joi.object({
    description: joi.string().min(5).max(20).required(),
    price: joi.number().required(),
    operation: joi.string().required()
});

export default walletSchema