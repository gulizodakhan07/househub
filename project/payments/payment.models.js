import mongoose from "mongoose";

// Payment Schema
const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    type: {
        type: String,
        enum: ['top_listing', 'other'], // top_listing to'g'ridan-to'g'ri sotuv uchun emas, reklamani ko'tarish uchun
        required: true
    },
    duration: {
        type: Number,
        default: 7 
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

export const Payment = mongoose.model('Payment', paymentSchema);


