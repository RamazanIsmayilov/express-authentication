const {Router} = require("express")
const { register, login } = require("../controllers/auth.controllers")
const { validationMiddleware } = require("../middleware/validation.middleware")
const { registerValidation, loginValidation } = require("../validations/user.validation")
const authRouter = Router()

authRouter.post("/register", validationMiddleware(registerValidation), register)
authRouter.post("/login", validationMiddleware(loginValidation), login)

module.exports = authRouter