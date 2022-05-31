const mongoose = require("mongoose")
const { Schema } = mongoose;
const ProductSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    category: {
        type:String,
        required: true,
        unique: true
    },
    price: {
        type:Number,
        required: true,
    },
    date: {
        type: String,
        default:   new Date().toLocaleString()
    },
     });

module.exports = mongoose.model('products',ProductSchema)
//products named collection will be created
