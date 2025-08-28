const express = require('express')

const { getWishlist, addToWishlist, removeFromwishlist } = require('../controllers/wishlistcontroller')
const { auth } = require('../middleware/auth')
const router = express.Router()

router.route('/wishlist').get(auth, getWishlist)
router.route('/wishlist').post(auth, addToWishlist)
router.route('/wishlist/:productId').delete(auth, removeFromwishlist)

module.exports = router