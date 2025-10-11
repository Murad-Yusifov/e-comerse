
import express from "express";
import { deleteUser, getUsers } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import userModel from "../models/userScheme.js";

const router = express.Router();

// Admin: Get all users
router.get("/",authMiddleware, adminMiddleware, getUsers);


router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // from JWT

    const user = await userModel.findById(userId).select("-password"); // exclude password

    const orders = await OrderModel.find({ user: userId })
      .populate("items.product", "name price") // optional: populate product details
      .sort({ createdAt: -1 });

    res.json({ user, orders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", authMiddleware, adminMiddleware, deleteUser);

export default router;






// router.get("/", authMiddleware, (req, res, next) => {
//   if (req.user.role !== "admin") return res.status(403).json({ error: "Access denied" });
//   next();
// }, getUsers);


// import express from "express"
// import { deleteUser, getUsers, registerUser } from "../controllers/userController.js";
// import { authMiddleware } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get('/',authMiddleware, (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Access denied" });
//   }
//   next();
// }, getUsers);
// router.post('/', registerUser);
// router.delete('/:id',authMiddleware, (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Access denied" });
//   }
//   next();
// }, deleteUser);

// // module.exports = router;

// export default router
