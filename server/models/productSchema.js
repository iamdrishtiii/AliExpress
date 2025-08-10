const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    color: {
        type: String
    },
    category: {
        type: String
    },
    discount: {
        type: String
    }
})

module.exports = mongoose.model('Products', productSchema)