import { addressestRouter } from "./AddressesRoute";
import { BrandRoute } from "./BrandRoute";
import { cartRoute } from "./CartRoute";
import { CategoryRouter } from "./CategoryRoute";
import { couponRoute } from "./CouponRoute";
import { orderRoute } from "./OrderRoute";
import { ProductRoute } from "./ProductRoute";
import { ReviewRoute } from "./ReviewRoute";
import { SubCategoryRoute } from "./SubCategoryRoute";
import { UserRoute } from "./UserRoute";
import { authRoute } from "./authRoute";
import { whishListRouter } from "./wishListRoute";

export const mountedRoutes = (app,BASE_PATH:string) => {
    app.use(`${BASE_PATH}/categories`, CategoryRouter);
    app.use(`${BASE_PATH}/subcategories`, SubCategoryRoute);
    app.use(`${BASE_PATH}/brands`, BrandRoute);
    app.use(`${BASE_PATH}/products`, ProductRoute);
    app.use(`${BASE_PATH}/users`, UserRoute);
    app.use(`${BASE_PATH}/auth`, authRoute);
    app.use(`${BASE_PATH}/reviews`, ReviewRoute);
    app.use(`${BASE_PATH}/wishlist`, whishListRouter);
    app.use(`${BASE_PATH}/addresses`, addressestRouter);
    app.use(`${BASE_PATH}/coupons`, couponRoute);
    app.use(`${BASE_PATH}/cart`, cartRoute);
    app.use(`${BASE_PATH}/orders`, orderRoute);
};
