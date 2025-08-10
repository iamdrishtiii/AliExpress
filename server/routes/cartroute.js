const express = require('express')

const { addToCart, getCart, removeFromCart } = require('../controllers/cartcontroller')
const { auth } = require('../middleware/auth')
const router = express.Router()

router.route('/cart').get(auth, getCart)
router.route('/cart').post(auth, addToCart)
router.route('/cart/:productId').delete(auth, removeFromCart)

module.exports = router