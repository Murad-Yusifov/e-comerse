import Image from "../models/imageSchema.js";


// Get all images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find().populate("product");
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single image by ID
export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new image
export const addImage = async (req, res) => {
  try {
    const { url, altText, product } = req.body;
    const newImage = new Image({ url, altText, product });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
