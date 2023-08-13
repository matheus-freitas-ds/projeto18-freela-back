import { Router } from "express"
import { signIn, signUp } from "../controllers/auth.controller.js"
import validateSchema from "../middlewares/validateSchema.middleware.js"
import { loginSchema, signUpSchema } from "../schemas/auth.Schema.js"

const authRouter = Router()

authRouter.post("/sign-up", validateSchema(signUpSchema), signUp)
authRouter.post("/login", validateSchema(loginSchema), signIn)

export default authRouter