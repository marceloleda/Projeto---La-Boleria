import Joi from "joi"

export const cakesSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().allow(''),
    image: Joi.string().uri().required()
}) 
