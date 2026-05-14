import { Router } from "express";
import { userRegister, logoutAll, userLogin } from "../controllers/auth.controller.js";
import { loginUserValidationRules } from "../middleware/loginInputValidation.js";
import { registeredUserValidationRules } from "../middleware/registerInputValidation.js";


const authRoutes = Router()
authRoutes.post('/register', registeredUserValidationRules, userRegister)
authRoutes.post('/login', loginUserValidationRules, userLogin)
authRoutes.get('/logout-all', logoutAll)


export { authRoutes }