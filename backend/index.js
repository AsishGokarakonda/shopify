
const connectToMongo = require("./db");
const authentication = require('./routes/auth.js')
const products = require('./routes/products.js')


connectToMongo();
const express = require('express')
var cors = require('cors')
var app = express()
 
app.use(cors())
 
const port = process.env.Port || 5000


app.use(express.json({extended:false})) 
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.use("/api/auth",authentication)
app.use("/api/products",products)

app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})