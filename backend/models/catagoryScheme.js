import mongoose from "mongoose";

const catagorScheme = new mongoose.Schema({
    name:  {type:String, required:true},
    slug:  {type:String, required:true},
    createdAt:  {type:Date, default:Date.now},
})

const CatagoryModel = mongoose.model("Catagory", catagorScheme)

export default CatagoryModel



// const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//   name:      { type: String, required: true, unique: true },
//   slug:      { type: String, required: true, unique: true }, // URL üçün
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Category', categorySchema);
