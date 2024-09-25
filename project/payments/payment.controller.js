import { BadRequestException } from "../exception/badRequest.exception.js";
import { NotFoundException } from "../exception/notFound.exception.js";
import { Products } from "../products/product.model.js";
import { User } from "../user/user.models.js";
import { Payment } from "./payment.models.js";

class PaymentController {
    #_user
    #_product
    #_payment
    constructor() {
        this.#_payment = Payment;
        this.#_product = Products;
        this.#_user = User;
    }

    // Top-listing uchun to'lov
    createPayment = async (req, res, next) => {
        try {
            const { userId, productId, amount, type, duration } = req.body;

            // Foydalanuvchi va mahsulot tekshiruvi
            const user = await this.#_user.findById(userId);
            const product = await this.#_product.findById(productId);
            if (!user) {
                throw new NotFoundException("User not found!");
            }
            if (!product) {
                throw new NotFoundException("Product not found!");
            }

            // To'lov turi tekshiruvi
            if (type !== 'top_listing') {
                throw new BadRequestException("Invalid payment type");
            }

            // Miqdor tekshiruvi
            const topListingPrice = 50; // Top listing uchun narx (misol uchun)
            if (amount < topListingPrice) {
                throw new BadRequestException(`You must pay at least ${topListingPrice} for top listing`);
            }

            // To'lovni yaratish
            const newPayment = await this.#_payment.create({
                user: userId,
                product: productId,
                amount,
                status: 'completed',
                type,
                duration
            });

            product.isTopListing = true;
            product.topListingExpires = new Date(Date.now() + duration * 24 * 60 * 60 * 1000); // Necha kun bo'lishini belgilang
            await product.save();

            res.status(201).send({
                statusCode: 201,
                message: "Payment created successfully and product is now in top listing!",
                payment: newPayment
            });

        } catch (err) {
            next(err);
        }
    };

    // Barcha to'lovlarni olish
    getAllPayments = async (req, res, next) => {
        try {
            const payments = await this.#_payment.find()
                .populate('user')
                .populate('product');

            res.send({
                message: "success",
                data: payments,
            });
        } catch (err) {
            next(err);
        }
    };

    // To'lovni o'chirish
    deletePayment = async (req, res, next) => {
        try {
            const { paymentId } = req.params;
            const deletedPayment = await this.#_payment.findById(paymentId);

            if (!deletedPayment) {
                throw new NotFoundException("Payment not found!");
            }

            const result = await this.#_payment.findByIdAndDelete(paymentId);
            res.status(200).send({
                statusCode: 200,
                message: "Payment deleted successfully!",
                deleted: result
            });

        } catch (err) {
            next(err);
        }
    };
}

export default new PaymentController();
