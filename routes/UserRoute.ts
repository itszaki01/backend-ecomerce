import express from "express";
import {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    changePassword,
    getLoggedUserData,
    updateLoggedUserPassword,
    updateLoggedUserProfile,
} from "../services/userService";
import { resizeSingleImg, uploadSingleImage } from "../middlewares/uploadOneImg";
import {
    changePasswordValidator,
    creatUserValidator,
    deleteUserValidator,
    getUserValidator,
    updateLoggedUserPasswordValidator,
    updateLoggedUserProfileValidator,
    updateUserValidator,
} from "../utils/validators/UserValidator";
import { allowTo, auth } from "../services/authService";

const router = express.Router();

router.get("/getMe", auth, getLoggedUserData, getUser);
router.put("/changeMyPassword", auth, updateLoggedUserPasswordValidator, updateLoggedUserPassword);
router.put("/updateMe", auth, updateLoggedUserProfileValidator, updateLoggedUserProfile, updateUser);

router
    .route("/")
    .get(auth, allowTo("admin"), getAllUsers)
    .post(auth, allowTo("admin"), uploadSingleImage("profileImg"), creatUserValidator, resizeSingleImg("users"), createUser);

router
    .route("/:id")
    .get(auth, allowTo("admin"), getUserValidator, getUser)
    .put(auth, allowTo("admin"), uploadSingleImage("profileImg"), updateUserValidator, resizeSingleImg("users"), updateUser)
    .delete(auth, allowTo("admin"), deleteUserValidator, deleteUser);
router.put("/changePassword/:id", auth, allowTo("admin"), changePasswordValidator, changePassword);

export { router as UserRoute };
