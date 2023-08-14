import Joi from "joi"

export const addProductSchema = Joi.object({
    title: Joi.string().trim().required(),
    image: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().integer().required()
})