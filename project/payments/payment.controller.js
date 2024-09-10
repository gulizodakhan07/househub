import { BadRequestException } from "../exception/badRequest.exception.js";
import { NotFoundException } from "../exception/notFound.exception.js";
import { Products } from "../products/product.model.js";
import { User } from "../user/user.models.js";
import { Payment } from "./payment.models.js";

class PaymentController {
    #_user
    #_product
    #_payment
    constructor(){
        this.#_payment = Payment
        this.#_product = Products
        this.#_user = User
    }
    createPayment = async (req, res, next) => {
        try {
            const {userId,productId,amount} = req.body
            const user = await this.#_user.findById(userId)
            const product = await this.#_product.findById(productId)
            if(!user){
                throw new NotFoundException("User not found!")
            }
            if(!product){
                throw new NotFoundException("Product not found!")
            }
            const productPrice = product.price
            if(amount < productPrice){
                throw new BadRequestException("You must pay in full")
            }

            const newPayment = await this.#_payment.create({
                user: userId,
                product: productId,
                amount,
                status: 'completed'
            })
            res.status(201).send({
                statusCode: 201,
                message: "Payment created successfully!",
                payment: newPayment
            })
            
        } catch (err) {
            next(err);
        }
    };

    getAllPayments = async (req, res, next) => {
        try {
            const payments = await this.#_payment.find()
                .populate('user', 'first_name email') 
                .populate('product', 'title price')
            res.send({
                message: "success",
                data: payments,
            });
        } catch (err) {
            next(err);
        }
    };
    deletePayment = async (req,res,next) =>{
        try{
            const {paymentId} = req.params
            const deletedPayment = await this.#_payment.findById(paymentId)
            if(!deletedPayment){
                throw new NotFoundException("Payment not found!")
            }
            const result = await this.#_payment.findByIdAndDelete(paymentId)
            res.status(200).send({
                statusCode: 200,
                message: "Payment deleted successfully!",
                deleted: result
            })

        }catch(err){
            next(err)
        }
    }

}

export default new PaymentController();
