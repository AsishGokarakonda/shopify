const express = require("express")
const productssch = require("../models/Products")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")

router.get("/getallproducts",fetchuser,async (req,res)=>{
    try{
        const notes = await productssch.find({})
        // const notes = "Hi"
        res.status(200).send(notes)
    }        
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})


router.post("/addproduct",async (req,res)=>{
    try{
        const { name, category, price } = req.body
        let product = await productssch.create({
            name: name,
            category: category,
            price: price
        })
        res.status(200).send(product)
    }        
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})


module.exports = router