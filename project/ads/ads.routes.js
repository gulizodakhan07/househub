import express from 'express';
import adsController from './ads.controller.js';

const adRoutes = express.Router();

adRoutes.post('/create', adsController.createAd);

adRoutes.get('/check-expiration', adsController.checkAdsExpiration);

export default adRoutes;
