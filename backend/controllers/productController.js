import ProductModel from "../models/Product.js";

// Get all products
export const getProducts = async (req, res) => {
  const products = await ProductModel.find().populate('category');
  res.json(products);
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch {
    res.status(404).json({ error: 'Product not found' });
  }
};
