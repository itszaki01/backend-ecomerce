import express from "express";
import { createNewProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../services/ProductService";
import {
    createProductValidator,
    deleteProductValidator,
    getProductValidator,
    updateProductValidator,
} from "../utils/validators/ProductValidators";
import { imagesRsizer, uploadImages } from "../middlewares/uploadImages";
import { auth, allowTo } from "../services/authService";


const router = express.Router();


//Product Routes
//@ts-ignore
router.route("/").get(getAllProducts).post(auth,allowTo('admin'),uploadImages(),createProductValidator,imagesRsizer, createNewProduct);
// router.route("/").get(getAllProducts).post(parseBody, createNewProduct);
router
    .route("/:id")
    .get(getProductValidator, getProduct)
    .put(auth,allowTo('admin'),updateProductValidator, updateProduct)
    .delete(auth,allowTo('admin'),deleteProductValidator, deleteProduct);


export const ProductRoute = router;
