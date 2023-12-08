import express from 'express'
import { addProductToWishList, getAllWishListOfLoggedUsre, removeProductFromWishList } from '../services/wishListService'
import { allowTo, auth } from '../services/authService'


const router = express.Router()


router.route('/').get(auth,allowTo('user'),getAllWishListOfLoggedUsre).post(auth,allowTo('user'),addProductToWishList)
router.route('/:id').delete(auth,allowTo('user'),removeProductFromWishList)








export {router as whishListRouter}