import express from "express"
import {getAllProducts} from "../controllers/product.controller.js"
import asyncHandler from "express-async-handler"
const router = express.Router()

router.get("/", asyncHandler(getAllProducts))

export default router
