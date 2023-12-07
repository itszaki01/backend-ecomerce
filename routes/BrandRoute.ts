import express from "express";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../services/BrandService";
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from "../utils/validators/BrandValidators";
import { resizeSingleImg, uploadSingleImage } from "../middlewares/uploadOneImg";
import { auth, allowTo } from "../services/authService";

const router = express.Router();

router.route("/").get(getAllBrands).post(auth, allowTo("admin"), uploadSingleImage(), createBrandValidator, resizeSingleImg("brand"), createBrand);
router
    .route("/:id")
    .get(getBrandValidator, getBrand)
    .put(auth, allowTo("admin"), updateBrandValidator, updateBrand)
    .delete(auth, allowTo("admin"), deleteBrandValidator, deleteBrand);

export const BrandRoute = router;
