import { Product } from "../../models/ProductModal";


export const productChecker = async (id: string) => {
    const product = await Product.findById(id);
    if (!product) {
        return Promise.reject(new Error(`No Product for this id ${id}`));
    }else{
        return true
    }
};

