import express from "express"
import {
    getAllOrders,
    createOrder,
    getTotalOrderAmount,
} from "../controllers/order.controller.js"
import asyncHandler from "express-async-handler"

const router = express.Router()

router
    .route("/")
    .get(asyncHandler(getAllOrders))
    .post(asyncHandler(createOrder))
router.get("/totalAmount/:orderNumber", asyncHandler(getTotalOrderAmount))

export default router
