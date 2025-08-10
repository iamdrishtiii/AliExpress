const express = require('express')
const { getAllCategories } = require("../controllers/categoriescontroller")
const router = express.Router()

router.get('/categories', getAllCategories)


module.exports = router