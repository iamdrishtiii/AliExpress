const ProductSchema = require('./models/productSchema')
const categoriesSchema = require('./models/categoriesSchema')

const Products = async () => {
    console.log('Fetching products...')
    try {
        const response = await fetch("https://fakestoreapi.com/products", {
            method: 'GET',
        })

        let products = await response.json()
        
        // console.log(products)

        for (let product of products) {
            const exists = await ProductSchema.findOne({ id: String(product.id) })
            if (!exists) {
                await ProductSchema.create({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    description: product.description,
                    brand: product.brand,
                    price: product.price,
                    model: product.model,
                    color: product.color,
                    category: product.category,
                    popular: product.popular,
                    discount: product.discount
                })
            } else {
                return console.log('Products Data Already Exists in the Database')
            }
        }
        console.log('Products Imported!')
    } catch (err) {
        console.error('Failed to import products:', err);
    }
}
const Categories = async () => {
    console.log("Fetching categories...")
    try {
        const response = await fetch("https://fakestoreapi.com/products/categories", {
            method: "GET"
        })
        
        let categories = await response.json()  
        // console.log(categories)

        for (let category of categories) {
            const exists = await categoriesSchema.findOne({ categories: category })
            if (!exists) {
                await categoriesSchema.create({
                    categories:category
                })
            } else {
                return console.log('Categories Data Already Exists in the Database')
            }
        }
        console.log('Categories imported')
    } catch (error) {
        console.error('Failed to import products:', error);
    }
}

module.exports = { Products, Categories }