const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
       name: String,
       email: {
              type: String,
              required: true,
              unique: true
       },
       password: {
              type: String,
              minLength: 5
       }
})
const user = mongoose.model('Users', userSchema);
module.exports = user;