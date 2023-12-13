import express from "express";
import { checkoutSession, createCashOrder, getAllOrders, getOrder, updateOrderDelivred, updateOrderPayed } from "../services/OrderService";
import { allowTo, auth } from "../services/authService";

const router = express.Router();

router.use(auth);
router.route("/").get(allowTo("user"),(req, _, next) => {
    const _req = req as any;
    if (_req.user.role === "user") _req.filterObj = { user: _req.user._id };
    next();
}, getAllOrders);
router.route("/:id").get(getOrder).post(createCashOrder);
router.route("/:id/pay").put(allowTo("admin"),updateOrderPayed)
router.route("/:id/deliver").put(allowTo("admin"),updateOrderDelivred)
router.route("/checkout-session/:cartId").post(allowTo("user"),checkoutSession)

export const orderRoute = router;
