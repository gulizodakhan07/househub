import { Schema, model } from 'mongoose';

const adsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isTopListing: {
        type: Boolean,
        default: false,
    },
    topListingExpires: {
        type: Date,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    }
},{
    timestamps: true
});

export const Ads = model('Ads', adsSchema);
