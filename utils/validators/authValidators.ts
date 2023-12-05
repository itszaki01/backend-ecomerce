import { check } from "express-validator";
import { applySlugify } from "../../middlewares/applySlugify";
import { uniqueChecker } from "../checkers/uniqueChecker";
import { User } from "../../models/UserModal";
import { validatorMw } from "../../middlewares/validatorMw";







export const signUpValidator = [
    applySlugify,
    check("name").notEmpty().withMessage("Name is required"),
    check("email")
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (value) => await uniqueChecker(User, { data: { email: value }, field: "Email" })),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("Password confirm is required").custom((value, { req }) =>{
            if (value !== req.body.password) {
                throw new Error("Password confirm does not match password");
            }else{
                return true
            }
        } ),
    check("phone")
        .isMobilePhone("any")
        .withMessage("Invalid phone number")
        .custom(async (value) => await uniqueChecker(User, { data: { phone: value }, field: "Phone number" })),
        check('role').isEmpty().withMessage("Role is not allowed"),
    validatorMw,
];


export const logInValidator = [
    check("email").isEmail().withMessage("Invalid email"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    validatorMw
]
