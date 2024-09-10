
import { Router } from "express";
import productController from "./product.controller.js";
import { upload } from "../utils/multer.utils.js";
import ValidationMiddleWare from "../middleware/validation.middleware.js";
import { UpdateProductSchema } from "./dtos/update-product.dto.js";
import { CreateProductSchema } from "./dtos/create-product.dto.js";
export const houseRoutes = Router()
    .get('/',productController.getAllProducts)
    .post('/add',upload.array('images',10),ValidationMiddleWare(CreateProductSchema),productController.createProduct)
    .put('/update/:productId',upload.array('images',10), ValidationMiddleWare(UpdateProductSchema), productController.updateProduct)
    .delete('/delete/:productId',productController.deleteProduct)