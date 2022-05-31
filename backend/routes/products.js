const express = require("express")
const productssch = require("../models/Products")
const cartsch = require("../models/Cart.js")
const reviewsch = require("../models/Reviews.js")
const usersch = require("../models/User")
const router = express.Router()
const fetchuser = require("../middleware/fetchuser")

router.get("/getallproducts",async (req,res)=>{
    try{
        const products = await productssch.find({})
        // const notes = "Hi"
        res.status(200).send(products)
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



router.put("/updateproduct/:id",async (req,res)=>{
    try{
        const { name, category, price } = req.body
        const product = await productssch.findById(req.params.id)
        if (!product) {
            return res.status(404).send("Notes doesnot exists")
        }
        const newproduct = {}
        newproduct.name = name
        newproduct.category = category
        newproduct.price = price
        let updatedProduct = await productssch.findByIdAndUpdate(req.params.id, { $set: newproduct }, { new: true })
        return res.status(200).send(updatedProduct)
    }        
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})


router.post("/addtocart/:id", fetchuser,async (req, res) => {
    try {
        const item = await productssch.findById(req.params.id)
        let notes = await cartsch.create({
            userId : req.user.id,
            name : item.name,
            category:item.category,
            price:item.price
        })
        res.status(200).send(notes)

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})

router.get("/getcart",fetchuser,async (req, res) => {
    try{
        const cart = await cartsch.find({ userId: req.user.id })
        res.status(200).send(cart)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})


router.post("/addreview/:id",fetchuser,async  (req, res) => {
    const userid =req.user.id
    const {review} = req.body
    const item = await productssch.findById(req.params.id)
    let notes = await reviewsch.create({
        itemId : req.params.id,
        userId : userid,
        review:review
    })
    res.status(200).send(notes)
})


router.get("/more/:id",fetchuser,async (req, res) => {
    try{
        const item = await productssch.findById(req.params.id)
        const reviews = await reviewsch.find({ itemId: req.params.id })

        var totalReviews = []
        for (let index = 0; index < reviews.length; index++) {
            const names = reviews[index]["userId"];
            const username = await usersch.findById(names)
            const review = reviews[index]["review"]
            const dict ={}
            dict[username.name] = review
            totalReviews.push(dict)
        }
        res.status(200).send(totalReviews)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error occured")
    }
})



module.exports = router