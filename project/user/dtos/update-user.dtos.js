import Joi from "joi";
export const UpdateUserSchema = Joi.object({
    firt_name: Joi.string(),
    last_name: Joi.string(),
    phone_number: Joi.string().pattern(/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/).required(),
    usename: Joi.string(),
    password: Joi.number().min(4).max(6).required()

})