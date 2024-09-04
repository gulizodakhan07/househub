import Joi from "joi";
export const userCReateSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string(),
    phone_number: Joi.string().pattern(/^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/).required(),
    email: Joi.string().email().trim().required(),
    username: Joi.string().min(5).max(10),
    password: Joi.string().min(4).max(6).required(),
    role: Joi.string().valid("admin","super-admin","user")
    
})