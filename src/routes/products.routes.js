import { Router } from "express"
import { addProduct, getProducts, manageProducts } from "../controllers/products.controller.js"
import validateSchema  from "../middlewares/validateSchema.middleware.js"
import { addProductSchema } from "../schemas/products.schema.js"
import { authValidation } from "../middlewares/auth.middleware.js"

const productsRouter = Router()

productsRouter.post("/add-products", validateSchema(addProductSchema), authValidation, addProduct)
productsRouter.get("/home", authValidation, getProducts)
productsRouter.get("/manage-products", authValidation, manageProducts)

export default productsRouter