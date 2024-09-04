// import { Router } from 'express';
// import { getAllHouses, getAllHousesByAddress, getAllHousesSotuv, getSingleHouses } from './dtos/product.controller.js';

// const houseRoutes = Router();
// houseRoutes.get('/',getAllHouses)
// houseRoutes.get('/sotuv',getAllHousesSotuv);

// houseRoutes.get('/ijara/:houseId', getSingleHouses);
// houseRoutes.get('/qidiruv', getAllHousesByAddress);



// export default houseRoutes;


import { Router } from "express";
import productController from "./product.controller.js";
export const houseRoutes = Router()
    .get('/',productController.getAllProducts)
    .post('/add',productController.createProduct)
    .put('/update/:productId',productController.updateProduct)
    .delete('/delete/:productId',productController.deleteProduct)