import { Products } from '../products/product.model.js';
import { sendEmail } from '../utils/send-email.utils.js';
import { Ads } from './ads.model.js';

class AdsController {

    createAd = async (req, res, next) => {
        try {
            const { userId, productId, topListingExpires } = req.body;
            const product = await Products.findById(productId);

            if (isNaN(new Date(topListingExpires).getTime())) {
                return res.status(400).json({ message: 'Invalid date format for topListingExpires' });
            }

            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }
            const duration = 7

            const topListingexpiresDate = new Date(topListingExpires);
            topListingexpiresDate.setDate(topListingexpiresDate.getDate() + duration); 

            const ad = await Ads.create({
                product: productId,
                user: userId,
                isTopListing: true,
                topListingExpires: topListingexpiresDate,
                paymentStatus: 'completed', 
            });

            product.isTopListing = true;
            product.topListingExpires = topListingExpires;
            await product.save();

            res.status(201).send({
                message: 'Ad created and product listed on top successfully!',
                data: ad,
            });
        } catch (err) {
            next(err);
        }
    };

    checkAdsExpiration = async () => {
        try {
            const now = new Date();
            const expiredAds = await Ads.find({
                isTopListing: true,
                topListingExpires: { $lte: now }, 
            });

            for (const ad of expiredAds) {
                const product = await Products.findById(ad.product);
                if (product) {
                    product.isTopListing = false;
                    product.topListingExpires = null;
                    await product.save();
                }

                ad.isTopListing = false; 
                await ad.save();

                // await sendEmail({
                //     to: ad.user.email,
                //     subject: 'Reklamangiz muddati tugadi',
                //     text: `Sizning ${product.title} mahsulotingiz reklama muddati tugadi.`,
                // });
                // menga refresh tokenni funksiyasini tuzib qayerda ishlatilishini korsatib ber
                if (ad.user && ad.user.email) {
                    await sendEmail({
                        to: ad.user.email,
                        subject: 'Reklamangiz muddati tugadi',
                        text: `Sizning ${product.title} mahsulotingiz reklama muddati tugadi.`,
                    });
                    console.log(ad.user.email);
                } else {
                    console.error('User email not found for ad:', ad._id);
                }
                console.log(ad.user.email)
            }

            return { message: 'Ads expiration checked and updated successfully!', expiredAds };
        } catch (err) {
            console.error('Error checking ads expiration:', err);
            throw err;
        }
    };
}

export default new AdsController();
