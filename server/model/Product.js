const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    owner_name: {
        type: String,
        required: true
    },
    last_bidder_name: {
        type: String,
        required: true
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    last_bidder_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    imgURL: {
        type: String
    }
})

const model = mongoose.model("ProductModel", ProductSchema)

module.exports = model