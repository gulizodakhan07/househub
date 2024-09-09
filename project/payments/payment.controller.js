import { Payment } from "./payment.models.js";

class PaymentController {
    createPayment = async (req, res, next) => {
        try {
            const { user, product, amount } = req.body;

            const newPayment = await Payment.create({
                user,
                product,
                amount
            });

            res.status(201).send({
                message: "Payment created successfully",
                data: newPayment,
            });
        } catch (err) {
            next(err);
        }
    };

    getAllPayments = async (req, res, next) => {
        try {
            const payments = await Payment.find()
                .populate('user', 'name email') 
                .populate('product', 'title price')

            res.send({
                message: "success",
                data: payments,
            });
        } catch (err) {
            next(err);
        }
    };

    updatePaymentStatus = async (req, res, next) => {
        try {
            const { status } = req.body;
            const updatedPayment = await Payment.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true, runValidators: true }
            );
            if (!updatedPayment) {
                return res.status(404).send({ message: "Payment not found" });
            }
            res.send({
                message: "Payment status updated successfully",
                data: updatedPayment,
            });
        } catch (err) {
            next(err);
        }
    };
}

export default new PaymentController();
