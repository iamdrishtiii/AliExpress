const express = require('express')
const app = express();
const dbConnection = require("./config/config")
const dotenv=require("dotenv");
const userroute = require("./routes/userroute")
const cartroute = require("./routes/cartroute")
const wishlistroute = require("./routes/wishlistroute")
const productroute = require("./routes/productroute")
const cookieParser = require('cookie-parser')
const {Products} = require("./Helper")
const cors = require('cors');
dotenv.config();
const Helper = require("./Helper")
app.use(express.json());
app.use(cors({
  origin:"*",
  credentials:true
}));
app.use(cookieParser());

// const routename = require("./route/routename")
// app.use(routename)


dbConnection()
Products()
app.use(userroute)
app.use(cartroute)
app.use(wishlistroute)
app.use(productroute)

app.get("/",(req,res)=>{
  res.send("Server Chal gya bhai")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server ${PORT} port pr chal gya h`)
})