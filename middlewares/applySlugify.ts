import { CustomValidator } from "express-validator";
import { TQuerParamsREQ } from "../@types/QueryParams.type";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";

export const applySlugify = expressAsyncHandler(async (req: TQuerParamsREQ, res, next) => {
    if (req.body.name) {
        req.body.slug = slugify(req.body.name);
    } else {
        req.body.slug = slugify(req.body.title);
    }
    next();
});
