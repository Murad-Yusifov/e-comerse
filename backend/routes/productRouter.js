import express from "express"
import { createProduct, deleteProduct, getProducts } from "../controllers/productController.js";

const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

// module.exports = router;

export default router
