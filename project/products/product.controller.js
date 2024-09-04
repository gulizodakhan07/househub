import { Products } from "./product.model.js"

class ProductController {
    #_product
    constructor(){
        this.#_product = Products

    }
    getAllProducts = async(req,res,next)=>{
        try {
            const query = { ...req.query };
            const result = await new ApiFeature(this.#_product.find(), query)
                .filter()
                .sort("price")
                .limitFields()
                .getQuery()
                .countDocuments();
            const filteredProductsResult = await new ApiFeature(this.#_product.find(), query)
                .filter()
                .sort("price")
                .limitFields()
                .paginate()
                .getQuery();

            res.send({
                message: "success",
                page: req.query?.page || 0,
                limit: req.query?.limit || 10,
                results: result,
                data: filteredProductsResult,
            });
        } catch (err) {
            next(err);
        }
    }
    createProduct(req,res,next){
        try{

        }catch(err){
            next(err)
        }
    }
    updateProduct(req,res,next){
        try{

        }catch(err){
            next(err)
        }
    }
    deleteProduct(req,res,next){
        try{

        }catch(err){
            next(err)
        }
    }
}
export default new ProductController()