import expressAsyncHandler from "express-async-handler";
import { TCategoryREQ } from "../../@types/Categorys.type";
import { CategoryModal as Category } from "../../models/CategoryModal";
import { ApiError } from "../apiError";
import { TProductREQ } from "../../@types/Product.type";

export const categoryChecker = async (id: string) => {
    const category = await Category.findById(id);
    if (!category) {
        return Promise.reject(new Error(`No Category for this id ${id}`));
    }else{
        return true
    }
};

