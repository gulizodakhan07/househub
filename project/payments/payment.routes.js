import {Router} from 'express';
import paymentController from './payment.controller.js';

const paymentRoutes = Router()

paymentRoutes.post('/', paymentController.createPayment);

paymentRoutes.get('/', paymentController.getAllPayments);
paymentRoutes.delete('/:paymentId',paymentController.deletePayment)

export default paymentRoutes;
