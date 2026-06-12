import express from "express"
import cors from "cors"
import ProductRoute from "./routes/product.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/products", ProductRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
