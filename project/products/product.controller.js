import path from "path";
import fs from "fs"
import ApiFeature from "../utils/api-feature.utils.js";
import { Products } from "./product.model.js"

class ProductController {
    #_product
    constructor() {
        this.#_product = Products
    }
    getAllProducts = async (req, res, next)=>{
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
    createProduct = async (req, res, next) => {
        try {
            const { user, title, price, number_of_rooms, address, material, rating, to_give } = req.body
            const images = req.files ? req.files.map(file => file.filename) : []
            
            

            const newProduct = await this.#_product.create({
                user,
                title,
                price,
                image_url: images[0],
                address,
                number_of_rooms,
                material,
                to_give,
                rating,
                to_give
            })


            res.status(201).send({
                message: "Product created successfully!",
                data: newProduct
            })

        } catch (err) {
            next(err)
        }

    }
    updateProduct = async (req, res, next) => {
        try {
            const {productId} = req.params
            const { title, price, number_of_rooms, address, material, rating } = req.body;
            const updatedProduct = {title,price,number_of_rooms,address,material,rating}
            const images = req.files ? req.files.map(file => file.filename) : []
            if(images.length > 0){
                updatedProduct.image_url = images
            }
            const updatedData = await this.#_product.findByIdAndUpdate(
                productId,
                updatedProduct,
            
            {new: true,runValidators: true})
            if(!updatedData) {
                return res.status(404).send({ message: "Product not found" });
            }
            res.send({
                message: "Product updated successfully",
                data: updatedData,
            });
        } catch (err) {
            next(err);
        }
    }
    deleteProduct = async (req, res, next) => {
        try {
            const {productId} = req.params
            const product = await this.#_product.findById(productId)
            if(!product){
                return res.status(404).send({message: "Product not found"})
            }
            if(product.image_url && product.image_url.length > 0){
                product.image_url.forEach(imagePath =>{
                    const filePath = path.join('uploads',imagePath)
                    fs.unlink(filePath,(err)=>{
                        console.log(`Deleting image file ${filePath}: `,err)
                    })

                })
            }
            await this.#_product.findByIdAndDelete(productId)
            res.status(200).send({
                message: "Product deleted successfully!"
            })

        } catch (err) {
            next(err)
        }
    }
}
export default new ProductController()