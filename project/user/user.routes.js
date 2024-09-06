import { Router } from "express";
import userController from "./user.controller.js";
import { sendEmail } from "../utils/send-email.utils.js";

const userRoutes = Router();

userRoutes.get('/', userController.getAllUsers);
userRoutes.post('/add', userController.createUser);
userRoutes.put('/update/:userId', userController.updateUser);
userRoutes.delete('/delete/:userId', userController.deleteUser);

export default userRoutes;
