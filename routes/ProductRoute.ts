import express from "express";
import { createNewProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../services/ProductService";
import {
    createProductValidator,
    deleteProductValidator,
    getProductValidator,
    updateProductValidator,
} from "../utils/validators/ProductValidators";
import { imagesRsizer, uploadImages } from "../middlewares/uploadImages";


const router = express.Router();


//Product Routes
//@ts-ignore
router.route("/").get(getAllProducts).post(uploadImages(),createProductValidator,imagesRsizer, createNewProduct);
// router.route("/").get(getAllProducts).post(parseBody, createNewProduct);
router
    .route("/:id")
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);


export const ProductRoute = router;
