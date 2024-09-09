import express from 'express';
import paymentController from './path/to/payment.controller.js';

const router = express.Router();

router.post('/payments', paymentController.createPayment);

router.get('/payments', paymentController.getAllPayments);

router.patch('/payments/:id', paymentController.updatePaymentStatus);

export default router;
