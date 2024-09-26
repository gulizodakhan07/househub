import cron from 'node-cron';
import adsController from '../ads/ads.controller.js';

cron.schedule('0 0 * * *', () => {
    console.log('Running Ads expiration check...');
    adsController.checkAdsExpiration()
        .then(result => console.log(result.message))
        .catch(err => console.error('Error in checking ads expiration:', err));
  });