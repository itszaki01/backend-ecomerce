import expressAsyncHandler from "express-async-handler";
import { TFilterObj } from "../@types/Other.type";
import { createProductValidator } from "../utils/validators/ProductValidators";

export const filterObj = expressAsyncHandler(async (req, res, next) => {
    const _req = req as TFilterObj;
    const { categoryID, productID } = _req.params;
    _req.filterObj = {} as any;
    if (categoryID) {
        _req.filterObj = { category: categoryID } as any;
    } else if (productID) {
        _req.filterObj = { product: productID } as any;
    }
    next();
});
