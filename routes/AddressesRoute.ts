import express from 'express'
import { allowTo, auth } from '../services/authService'
import { addAddress, getAllAddressesOfLoggedUser, removeAddress } from '../services/addressesService'


const router = express.Router()


router.route('/').get(auth,allowTo('user'),getAllAddressesOfLoggedUser).post(auth,allowTo('user'),addAddress)
router.route('/:id').delete(auth,allowTo('user'),removeAddress)








export {router as addressestRouter}