import Joi from "joi";
export const UpdateUserSchema = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email().trim().required(),
    phone_number: Joi.string().pattern(/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/).required(),
    username: Joi.string().required(),
    password: Joi.string().min(4).max(6).required()
})