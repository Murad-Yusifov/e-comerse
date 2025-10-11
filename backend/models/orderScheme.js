import mongoose from "mongoose";


const orderItemScheme = new mongoose.Schema({
    product: {type:mongoose.Schema.Types.ObjectId, ref:"Product"},
    qty: {type:Number, required:true},
    price: {type:Number, required:true},
})

const orderScheme = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    items: [orderItemScheme],
    total: {type:Number, required:true},
    status: {type:String, emun:['pending',"paid", "shipped","completed","cancelled"], default:"pending"},
    shipping: {
        address:  String,
        city: String,
        zip: String,
        country: String
    },
    createdAt: {type:Date, default:Date.now}
})
 const OrderModel = mongoose.model("Order", orderScheme)

 export default OrderModel




// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   qty:     { type: Number, required: true, default: 1 },
//   price:   { type: Number, required: true } // snapshot price
// });

// const orderSchema = new mongoose.Schema({
//   user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items:       [orderItemSchema],
//   total:       { type: Number, required: true },
//   status:      { type: String, enum: ['pending','paid','shipped','completed','cancelled'], default: 'pending' },
//   shipping:    {
//     address: String,
//     city:    String,
//     zip:     String,
//     country: String
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Order', orderSchema);
