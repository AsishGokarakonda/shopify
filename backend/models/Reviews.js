const mongoose = require("mongoose")
const { Schema } = mongoose;
const ReviewSchema = new Schema({ 
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    review:{
        type: String,
        default:null
    },
    date:{
        type:Date,
        default:Date.now
    } });

module.exports = mongoose.model("reviews",ReviewSchema)