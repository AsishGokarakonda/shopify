const mongoose = require("mongoose")
const { Schema } = mongoose;
const CartSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    name: {
        type:String,
        required: true,
        unique:true
    },
    category: {
        type:String,
        required: true,
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

module.exports = mongoose.model('cart',CartSchema)
//cart named collection will be created
