import expressAsyncHandler from "express-async-handler";
import { TQuerParamsREQ } from "../@types/QueryParams.type";
import { CustomRequest } from "../@types/ResponseData.type";

export const filterObj = expressAsyncHandler(async (req, res, next) => {
    const _req = req as CustomRequest
    const { categoryID: id } = req.params;
    _req.filterObj = {} as any;
    if (id) {
        _req.filterObj = { category: id } as any;
    }
    next();
});
