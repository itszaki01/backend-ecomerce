import express from "express";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../services/BrandService";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "../utils/validators/BrandValidators";
import { resizeSingleImg, uploadSingleImage } from "../middlewares/uploadOneImg";

const router = express.Router();

router.route("/").get(getAllBrands).post(uploadSingleImage(),createBrandValidator,resizeSingleImg('brand'), createBrand);
router.route("/:id").get(getBrandValidator, getBrand).put(updateBrandValidator, updateBrand).delete(deleteBrandValidator, deleteBrand);

export const BrandRoute = router;
