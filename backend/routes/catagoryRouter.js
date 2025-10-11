import express from "express"
import { createCategory, deleteCategory, getCategories } from '../controllers/catagoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

// module.exports = router;

export default router
