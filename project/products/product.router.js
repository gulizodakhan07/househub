// Iltimos terminalda npm run dev deb ishga tushiring
import { Router } from 'express';
import { getAllHouses, getAllHousesByAddress, getAllHousesSotuv, getSingleHouses } from './dtos/product.controller.js';

const houseRoutes = Router();
houseRoutes.get('/',getAllHouses)
houseRoutes.get('/sotuv',getAllHousesSotuv);

houseRoutes.get('/ijara/:houseId', getSingleHouses);
houseRoutes.get('/qidiruv', getAllHousesByAddress);



export default houseRoutes;
