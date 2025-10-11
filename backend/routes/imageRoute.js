import express from "express";
import { getImages, getImageById, addImage, deleteImage } from "../controllers/imageController.js";

const router = express.Router();

router.get("/", getImages);
router.get("/:id", getImageById);
router.post("/", addImage);
router.delete("/:id", deleteImage);

export default router;
