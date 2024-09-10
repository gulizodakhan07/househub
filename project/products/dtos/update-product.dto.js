import Joi from 'joi';

export const UpdateProductSchema = Joi.object({
    user: Joi.string().optional(),
    title: Joi.string().min(3).max(100).required(),
    price: Joi.number().positive().required(),
    image_url: Joi.string().uri().optional(),
    address: Joi.string().min(5).required(),
    number_of_rooms: Joi.string().min(1).required(),
    material: Joi.string().valid('pishgan gisht', 'metal', 'taxta', 'beton').required(),
    to_give: Joi.string().valid('ijara', 'sotuv').optional(),
    rating: Joi.number().min(1).max(5).optional()
});