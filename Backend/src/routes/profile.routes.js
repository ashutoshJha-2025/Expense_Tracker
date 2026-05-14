import { Router } from "express";
import { getMe, setCurrency } from "../controllers/profile.controller.js";

const profileRoutes = Router()
profileRoutes.get('/get-me', getMe)
profileRoutes.post('/set-currency', setCurrency)

export { profileRoutes }