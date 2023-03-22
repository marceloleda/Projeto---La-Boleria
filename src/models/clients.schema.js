import Joi from "joi"

export const clientsSchema = Joi.object({
    name: Joi.string().min(2).required(),
    address: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).required()

}) 
