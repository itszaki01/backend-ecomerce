import expressAsyncHandler from "express-async-handler";
import { TFilterObj } from "../@types/Other.type";

export const filterObj = expressAsyncHandler(async (req, res, next) => {
    const _req = req as TFilterObj
    const { categoryID: id } = req.params;
    _req.filterObj = {} as any;
    if (id) {
        _req.filterObj = { category: id } as any;
    }
    next();
});
