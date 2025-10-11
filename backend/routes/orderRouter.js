import express from "express"
import { createOrder, deleteOrder, getALlOrders, getOrders } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Get orders for the current user
router.get('/',authMiddleware, getOrders);
router.post('/',authMiddleware, createOrder);
router.delete('/:id',authMiddleware, deleteOrder);

router.get("/all", authMiddleware, adminMiddleware, getALlOrders)

// module.exports = router;
export default router
