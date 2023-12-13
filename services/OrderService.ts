import expressAsyncHandler from "express-async-handler";
import { Cart } from "../models/CartModal";
import { ApiError } from "../utils/apiError";
import { Order } from "../models/OrderModal";
import { Product } from "../models/ProductModal";
import { getAll, getOne } from "../helpers/handlersFactory";
import { User } from "../models/UserModal";
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

export const createCashOrder = expressAsyncHandler(async (req, res, next) => {
    const _req = req as any;
    //app settings
    let taxPrice = 0;
    let shippingPrice = 0;
    //1: get cart depend on cartId
    console.log(req.params.id);
    const cart = await Cart.findById(req.params.id);
    if (!cart) return next(new ApiError("no cart for this id", 404));
    //2: get order price and check if there is a coupon
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
    //3:create order with defual payment method cash
    const order = await Order.create({
        user: _req.user._id,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        shippingPrice,
        taxPrice,
        totalOrderPrice,
    });
    //4: decrement products quntity and increase sold
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantitiy, sold: +item.quantitiy } },
            },
        }));
        //@ts-ignore
        await Product.bulkWrite(bulkOption, {});

        // 5) Clear cart depend on cartId
        await Cart.findByIdAndDelete(req.params.id);
    }

    res.status(201).json({ status: "success", data: order });
});

export const getAllOrders = getAll(Order);

export const getOrder = getOne(Order);

export const updateOrderPayed = expressAsyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ApiError("No order for this id", 404));
    }
    order.isPaid = true;
    order.paidAt = new Date(Date.now());
    await order.save();
    res.status(201).json({ status: "success", data: order });
});

export const updateOrderDelivred = expressAsyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ApiError("No order for this id", 404));
    }
    order.isDelivred = true;
    order.delivredAt = new Date(Date.now());
    await order.save();
    res.status(201).json({ status: "success", data: order });
});

// @desc    Get checkout session from stripe and send it as response
// @route   GET /api/v1/orders/checkout-session/cartId
// @access  Protected/User
export const checkoutSession = expressAsyncHandler(async (req, res, next) => {
    // app settings
    const taxPrice = 0;
    const shippingPrice = 0;
    const _req = req as any;
    // 1) Get cart depend on cartId
    const cart = await Cart.findById(req.params.cartId);
    if (!cart) {
        return next(new ApiError(`There is no such cart with id ${req.params.cartId}`, 404));
    }

    // 2) Get order price depend on cart price "Check if coupon apply"
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;

    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

    // 3) Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "dzd",
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: _req.user.name,
                        description: "Comfortable cotton t-shirt",
                    },
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${req.protocol}://${req.get("host")}/orders`,
        cancel_url: `${req.protocol}://${req.get("host")}/cart`,
        customer_email: _req.user.email,
        client_reference_id: req.params.cartId,
        metadata: req.body.shippingAddress,
    });

    // 4) send session to response
    res.status(200).json({ status: "success", session });
});

const createCardOrder = async (session: any,next:any) => {
    const cartId = session.client_reference_id;
    const userEmail = session.customer_email;
    const shippingAddress = session.metadata;

    console.log(cartId)
    console.log(userEmail)
    //app settings
    let taxPrice = 0;
    let shippingPrice = 0;
    
    const cart = await Cart.findById(cartId);
    const user = await User.findOne({ email: userEmail });
    if (!cart) return next(new ApiError('wrong cart id',404));
    if (!user) return next(new ApiError('wrong user id',404));
    //2: get order price and check if there is a coupon
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice;
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

    const order = await Order.create({
        user: user._id,
        cartItems: cart.cartItems,
        shippingAddress,
        shippingPrice,
        taxPrice,
        totalOrderPrice,
        isPaid:true,
        paidAt: new Date(Date.now()),
        paymentMethod:'card'
    });
    //4: decrement products quntity and increase sold
    if (order) {
        const bulkOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantitiy, sold: +item.quantitiy } },
            },
        }));
        //@ts-ignore
        await Product.bulkWrite(bulkOption, {});

        // 5) Clear cart depend on cartId
        await Cart.findByIdAndDelete(cartId);
    }
};


export const webhookCheckout = expressAsyncHandler(async (request, response,next) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        const _err = err as { message: string };
        console.log(`Webhook Error: ${_err.message}`);
        response.status(400).send(`Webhook Error: ${_err.message}`);
        return;
    }
    if (event.type === "checkout.session.completed") {
        createCardOrder(event.data.object,next)
    }
    response.status(201).json({recived:true});
});
