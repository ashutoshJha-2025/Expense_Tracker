import { Router } from "express";
import { addCategory, deleteCategory, getAllCategory } from "../controllers/category.controller.js";

const categoryRoutes = Router()
categoryRoutes.post('/add', addCategory)
categoryRoutes.delete('/delete', deleteCategory)
categoryRoutes.get('/get-all', getAllCategory)


export { categoryRoutes }