import { Brand } from "../../models/BrandModal";

export const brandChecker = async (id: string) => {
    const brand = await Brand.findById(id);
    if (!brand) {
        return Promise.reject(new Error(`No Brand for this id ${id}`));
    }else{
        return true
    }
};

