const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
       // name:{
       //       type:String,
       //       required:true
       // },
       email: {
              type: String,
              required: true,
              unique: true
       },
       password: {
              type: String,
              minLength: 5,
              required: true
       }
})
const user = mongoose.model('Users', userSchema);
module.exports = user;