import { Schema, model } from "mongoose";
const userScchema = new Schema({
    first_name: {
        type: String,
        required: true

    },
    last_name: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        enum:{
            values: ["admin","super-admin","user"]
        }
    }
},
{
    timestamps: true
}
)
export const User = model("user",userScchema)