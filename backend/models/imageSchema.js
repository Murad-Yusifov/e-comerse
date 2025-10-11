import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  altText: { type: String },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // this must match your Product model name
  },
}, { timestamps: true });

const Image = mongoose.model("Image", imageSchema);
export default Image;










// import mongoose from "mongoose";

// const imageSchema = new mongoose.Schema({
//   url: { type: String, required: true },
//   altText: { type: String },
// //   product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//     //  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false }
// }, { timestamps: true });

// const Image = mongoose.model("Image", imageSchema);
// export default Image;
