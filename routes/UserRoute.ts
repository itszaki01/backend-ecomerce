import express from 'express';
import { createUser, getAllUsers, getUser, updateUser,deleteUser, changePassword } from '../services/userService';
import { resizeSingleImg, uploadSingleImage } from '../middlewares/uploadOneImg';
import { changePasswordValidator, creatUserValidator, deleteUserValidator, getUserValidator, updateUserValidator } from '../utils/validators/UserValidator';



const router = express.Router();
router.route('/').get(getAllUsers).post(uploadSingleImage('profileImg'),creatUserValidator,resizeSingleImg('users'),createUser);
router.route('/:id').get(getUserValidator,getUser).put(uploadSingleImage('profileImg'),updateUserValidator,resizeSingleImg('users'),updateUser).delete(deleteUserValidator,deleteUser);
router.put('/changePassword/:id',changePasswordValidator,changePassword);

export {router as UserRoute}