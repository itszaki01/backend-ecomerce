import { CustomValidator } from "express-validator";
import { SubCategory } from "../../models/SubCategoryModal";
import { TSubCategoryREQ } from "../../@types/SubCategory.type";

export const multiSubCategoryChecker = async (subCategories: string[]) => {
    const subCategoriesCheck = await SubCategory.find({ _id: { $exists: true, $in: subCategories } });

    if (subCategoriesCheck.length != subCategories.length) {
        const checkedSubCategoriesArray = subCategoriesCheck.map((subC) => subC._id.toString());
        const invalidSubCategories = subCategories.filter((subC) => !checkedSubCategoriesArray.includes(subC));
        if (invalidSubCategories.length != 0) {
            return Promise.reject(new Error(`No SubCategory for this id's [ ${invalidSubCategories} ]`.replaceAll(",", " && ")));
        } else {
            true;
        }
    } else {
        return true;
    }
};

export const singleSubCategoryChecker = async (id: string) => {
    const subcategory = await SubCategory.findById(id);
    if (!subcategory) {
        return Promise.reject(new Error(`No SubCategory for this id ${id}`));
    } else {
        return true;
    }
};

//Check Category SubCategories if include subcategories in req.body
export const subCategoryBelongCategoryChecker: CustomValidator = async (currentSubCategories: string[], { req }) => {
    const _req = req as TSubCategoryREQ;
    const subcategories = await SubCategory.find({ category: _req.body.category });
    const subCategoriesInDB = subcategories.map((subC) => subC._id.toString());
    const validate = currentSubCategories.filter((subC) => subCategoriesInDB.includes(subC));
    const inValid = currentSubCategories.filter((subC) => !subCategoriesInDB.includes(subC));

    if (validate.length != currentSubCategories.length) {
        return Promise.reject(new Error(`The Subcategories => [${inValid}] is not belong Category id ${_req.body.category}`.replaceAll(",", " && ")));
    } else {
        return true;
    }
};
