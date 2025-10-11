import express from "express"
import { deleteComputer, getComputer, postComputer } from "../controllers/computerControllers.js"

const router = express.Router()

router
.get("/computers", getComputer)
.post("/computers", postComputer)
.delete("/computers/:id", deleteComputer )


export default router
