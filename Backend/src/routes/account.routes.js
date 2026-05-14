import { Router } from "express";
import { addAccount, deleteAccount, getAllAccount } from "../controllers/account.controller.js";

const accountRoutes = Router()
accountRoutes.post('/add', addAccount)
accountRoutes.delete('/delete', deleteAccount)
accountRoutes.get('/get-all', getAllAccount)

export { accountRoutes }