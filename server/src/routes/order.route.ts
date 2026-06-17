import express from "express"
import {
    createOrder,
    getAllOrdersSummary,
    getOrderDetails,
    getTotalOrderAmount,
    updatePaymentStatus,
} from "../controllers/order.controller.js"
import asyncHandler from "express-async-handler"

const router = express.Router()

router.route("/").post(asyncHandler(createOrder))
router.get("/summary", asyncHandler(getAllOrdersSummary))
router.get("/:orderNumber/details", asyncHandler(getOrderDetails))
router.patch("/:orderNumber/payment-status", asyncHandler(updatePaymentStatus))
router.get("/:orderNumber/total", asyncHandler(getTotalOrderAmount))

export default router
