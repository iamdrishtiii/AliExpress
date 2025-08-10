const Catergories = require('../models/categoriesSchema')
const getAllCategories = async (req, res) => {
       try {
              const categories = await Catergories.find({})
              return res.status(200).json({ message: 'All categories fetched!', categories })

       } catch (error) {
              return res.status(401).json({ message: error.message })
       }
}

module.exports = { getAllCategories }