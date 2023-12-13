import express from "express";
import { auth, allowTo } from "../services/authService";
import { createCoupon, deleteCoupon, getAllCoupons, getCoupon, updateCoupon } from "../services/CouponService";

const router = express.Router();
router.use(auth, allowTo("admin"));
router.route("/").get(getAllCoupons).post(createCoupon);
router.route("/:id").get(getCoupon).put(updateCoupon).delete(deleteCoupon);

export const couponRoute = router;
