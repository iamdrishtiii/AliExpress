const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
       name: {
              type: String,
              required: true,
              unique: true
       },
       email: {
              type: String,
              required: true,
              unique: true
       },
       password: {
              type: String,
              minLength: 5,
              required: true
       },
       wishlist: [{
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
       }],
       cart: [{
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
       }]
})
const user = mongoose.model('Users', userSchema);
module.exports = user;