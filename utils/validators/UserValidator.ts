import { check } from "express-validator";
import { validatorMw } from "../../middlewares/validatorMw";
import { applySlugify } from "../../middlewares/applySlugify";
import { idChecker } from "../checkers/idChecker";
import { User } from "../../models/UserModal";
import { deleteUser } from "../../services/userService";
import { uniqueChecker } from "../checkers/uniqueChecker";
import bcrypt from "bcryptjs";

export const creatUserValidator = [
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

    validatorMw,
];

export const updateUserValidator = [
    applySlugify,
    check('password').isEmpty().withMessage("Please use /changePassword to update password"),
    check("name").optional().notEmpty().withMessage("Name is required"),
    check("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (value) => await uniqueChecker(User, { data: { email: value }, field: "Email" })),
    check("phone")
        .optional()
        .isMobilePhone("any")
        .withMessage("Invalid phone number")
        .custom(async (value) => await uniqueChecker(User, { data: { phone: value }, field: "Phone number" })),
    check("id")
        .isMongoId()
        .withMessage("Invalid ID")
        .custom(async (value) => await idChecker(User, value)),
    validatorMw,
];

export const changePasswordValidator = [
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").notEmpty().withMessage("Password is required"),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("Password confirm is required").custom((value, { req }) =>{
            if (value !== req.body.password) {
                throw new Error("Password confirm does not match password");
            }else{
                return true
            }
        } ),
    check("id")
        .isMongoId()
        .withMessage("Invalid ID")
        .custom(async (value) => await idChecker(User, value)),
        //create burrent password validator
        check('currentPassword').notEmpty().withMessage("Current password is required").custom(async (value, { req }) =>{
            const user = await User.findById(req.params?.id).select('+password')
            if(!user){
                throw new Error("User not found")
            }
            const isMatch = await bcrypt.compare(value, user.password)
            if(!isMatch){
                throw new Error("Current password is incorrect")
            }
            return true
        }),
    validatorMw,
];

export const getUserValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid ID")
        .custom(async (value) => await idChecker(User, value)),
    validatorMw,
];

export const deleteUserValidator = [
    check("id")
        .isMongoId()
        .withMessage("Invalid ID")
        .custom(async (value) => await idChecker(User, value)),
    validatorMw,
];


export const updateLoggedUserProfileValidator = [
    applySlugify,
    check("name").optional(),
    check("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (value) => await uniqueChecker(User, { data: { email: value }, field: "Email" })),
    check("phone")
        .optional()
        .isMobilePhone("any")
        .withMessage("Invalid phone number")
        .custom(async (value) => await uniqueChecker(User, { data: { phone: value }, field: "Phone number" })),
    validatorMw,
]

export const updateLoggedUserPasswordValidator = [
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long").notEmpty().withMessage("Password is required"),
    check("passwordConfirm")
        .notEmpty()
        .withMessage("Password confirm is required").custom((value, { req }) =>{
            if (value !== req.body.password) {
                throw new Error("Password confirm does not match password");
            }else{
                return true
            }
        } ),
    check('currentPassword').notEmpty().withMessage("Current password is required").custom(async (value, { req }) =>{
        const user = await User.findById(req.user._id).select('+password')
        if(!user){
            throw new Error("User not found")
        }
        const isMatch = await bcrypt.compare(value, user.password)
        if(!isMatch){
            throw new Error("Current password is incorrect")
        }
        return true
    }),
    validatorMw,
]