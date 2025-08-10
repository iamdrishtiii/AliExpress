const express = require('express')
const { getAllProducts, getProduct } = require("../controllers/productcontroller")
const router = express.Router()

router.get('/products', getAllProducts)
router.get('/product/:id', getProduct)


module.exports = router