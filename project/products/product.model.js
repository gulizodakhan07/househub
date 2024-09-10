import { Schema,model } from "mongoose";
const productSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image_url: {
        type: [String],
        required: false
    },
    address: {
        type: String,
        required: true

    },
    number_of_rooms: {
        type: String,
        required: true
    },
    material:{
        type: String,
        required: true
    },
    to_give:{
        type: String,
        enum: ['ijara','sotuv']
    },
    rating:{
        type: Number,
        min: 1,
        max: 5
    }
})
export const Products = model('products',productSchema)
