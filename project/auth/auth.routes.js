import { Router } from "express";
import authController from "./auth.controller.js";
export const authRoutes = Router()
    .post('/sign-in',authController.signin)
    .post('/reset-password/:password_token',authController.resetPassword)
    .post('/forgot-password',authController.forgotPassword)