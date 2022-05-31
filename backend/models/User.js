const mongoose = require("mongoose")
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true,
    },
    date: {
        type: String,
        default:   new Date().toLocaleString()
    },
     });

module.exports = mongoose.model('users',UserSchema)
//users named collection will be created
