const mongoose = require('mongoose')

//created Schema
const productSchema = mongoose.Schema(
    {
        //fields
        name: {
            type: String,
            reqiured: [true,"Please enter a product name"]
        },
        quantity: {
            type: Number,
            required:true,
            default:  0
        },
        price:{
            type: Number,
            required: true
        },
        image:{
            type: String,
            required: false
        }
    },

    {
    timestamps: true
    }
)

//creating model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;