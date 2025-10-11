// routes/authRoutes.js
import express from "express";
import userModel from "../models/userScheme.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email: email.toLowerCase() });
    if (existingUser) return res.status(400).json({ error: "Email exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ name, email: email.toLowerCase(), password: hashedPassword });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

export default router;





// import express from "express";
// import { registerUser } from "../controllers/userController.js"; // reuse register logic
// import userModel from "../models/userScheme.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { JWT_SECRET } from "../config/config.js";

// const router = express.Router();

// // Register
// router.post("/register", registerUser);

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await userModel.findOne({ email: email.toLowerCase() });
//   if (!user) return res.status(401).json({ error: "User not found" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(401).json({ error: "Wrong password" });

//   const token = jwt.sign(
//     { id: user._id, name: user.name, email: user.email, role: user.role },
//     JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
// });

// export default router;
