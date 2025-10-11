import mongoose, { model } from "mongoose";

const userScheme = new mongoose.Schema({
    name:  {type:String, required:true},
    email:  {type:String, required:true, unique:true},
    password:  {type:String, required:true},
    // role:  {type:String, required:true},
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt:  {type:Date, default:Date.now},
})


// const userModel = mongoose.model("User", userScheme)
const userModel = mongoose.model("User", userScheme)

export default userModel

// model.exports = mongoose.model("user", userScheme)












// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name:      { type: String, required: true },
//   email:     { type: String, required: true, unique: true, lowercase: true },
//   password:  { type: String, required: true }, // hash ilə saxla (bcrypt)
//   role:      { type: String, enum: ['user','admin'], default: 'user' },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', userSchema);
