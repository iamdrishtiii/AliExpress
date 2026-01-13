const express = require('express')
const app = express();
const dbConnection = require("./config/config")
const dotenv=require("dotenv");
const userroute = require("./routes/userroute")
const productroute = require("./routes/productroute")
const categoriesroute = require("./routes/categoriesroute")
const cookieParser = require('cookie-parser')
const {Products,Categories} = require("./Helper")
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
Categories()
app.use(categoriesroute)
app.use(userroute)
app.use(productroute)

app.get("/",(req,res)=>{
  res.send("Server Chal gya bhai")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server ${PORT} port pr chal gya h`)
})