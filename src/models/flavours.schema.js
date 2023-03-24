import Joi from "joi"

export const flavoursSchema = Joi.object({
    name: Joi.string().min(2).required()
}) 
