import Joi from "joi"

export const signUpSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    city: Joi.string().min(2).required(),
    phone: Joi.string().min(10).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required()
})