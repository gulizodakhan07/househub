import { Router } from "express";
import userController from "./user.controller.js";

const userRoutes = Router();

userRoutes.get('/', userController.getAllUsers);
userRoutes.post('/add', userController.createUser);
userRoutes.put('/update/:userId', userController.updateUser);
userRoutes.delete('/delete/:userId', userController.deleteUser); 

export default userRoutes;
