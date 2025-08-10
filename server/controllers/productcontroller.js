const Product = require('../models/productSchema')
const getAllProducts = async (req, res) => {
       try {
              const products = await Product.find({})
              if (!products.length) {
                     return res.status(404).json({ message: 'No products found' });
              }
              return res.status(200).json({ message: 'All products fetched!', products })

       } catch (error) {
              return res.status(401).json({ message: error.message })
       }
}


const getProduct = async (req, res) => {
       const { id } = req.params;
       try {
              const product = await Product.find({ id })
              if (!product) {
                     return res.status(401).json({ message: 'Failed to fetch the product details' })
              }
              return res.status(200).json({ message: 'Product details fetched!', product })
       } catch (error) {
              return res.status(401).json({ message: error.message })
       }
}

module.exports = { getProduct, getAllProducts }