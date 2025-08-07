const express = require('express')
const app = express();
const dbConnection = require("./config/config")
const dotenv=require("dotenv");
const cors = require('cors');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cors());

// const routename = require("./route/routename")
const userroute = require("./routes/userroute")

// app.use(routename)
app.use(userroute)

dbConnection()

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})