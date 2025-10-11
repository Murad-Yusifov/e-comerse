import mongoose from "mongoose";

const productScheme = new mongoose.Schema({
    title:          {type:String, required: true},
    description:    {type:String, default: ""},
    price:          {type:Number, required: true},
    brand:         {type:String},
    // catagory:       {type:mongoose.Schema.Types.ObjectId, ref: "Catagory"},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Catagory" },
    image:          [{type:String}],
    stock:          {type:Number, default: 0},
    isHotDeal: { type: Boolean, default: false },
    rating:         {type: Number, default: 0},
    createdAt:      {type:Date, default: Date.now},
    updatedAt:      {type:Date},
})


productScheme.pre("save", function(next){
    this.updatedAt = Date.now()
    next()

})


const ProductModel = mongoose.model("Product", productScheme)

export default ProductModel








// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//   title:       { type: String, required: true },
//   description: { type: String, default: '' },
//   price:       { type: Number, required: true },
//   brand:       { type: String },
//   category:    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
//   images:      [{ type: String }], // URL list
//   stock:       { type: Number, default: 0 },
//   rating:      { type: Number, default: 0 },
//   createdAt:   { type: Date, default: Date.now },
//   updatedAt:   { type: Date }
// });

// productSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const Product = mongoose.model('Product', productSchema);

// export default Product;
