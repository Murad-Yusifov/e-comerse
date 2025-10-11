import CatagoryModel from "../models/catagoryScheme.js";


// Get all categories
export const getCategories = async (req, res) => {
  const categories = await CatagoryModel.find();
  res.json(categories);
};

// Create category
export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const category = new CatagoryModel({ name, slug });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    await CatagoryModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch {
    res.status(404).json({ error: 'Category not found' });
  }
};
