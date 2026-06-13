import express from "express"
import cors from "cors"
import ProductRoute from "./routes/product.route.js"
import OrderRoute from "./routes/order.route.js"
import {exceptionMiddleware} from "./middlewares/exception.middleware.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", ProductRoute)
app.use("/api/orders", OrderRoute)

app.use(exceptionMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
