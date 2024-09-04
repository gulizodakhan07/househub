import { Router } from "express";
import userRoutes from "../user/user.routes.js";
import { houseRoutes } from "../products/product.router.js";
export const routes = Router()
routes.use('/users',userRoutes)
routes.use('/products',houseRoutes)