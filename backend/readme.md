import express from "express"
import { getBasket, postBasket } from "../controller/basketController.js"

const router =express.Router()

router
.get('/basket', getBasket)
.post('/basket', postBasket)

export default router






https://github.com/Murad-Yusifov/React-tasks/blob/main/027-winter/backend/router/basketRouter.js