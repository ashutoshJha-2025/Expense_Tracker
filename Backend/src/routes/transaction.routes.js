import { Router } from "express";
import { createTransaction, getAllTransactions, getTransactionStats } from "../controllers/transaction.controller.js";

const transactionRoutes = Router()
transactionRoutes.post('/add', createTransaction)
transactionRoutes.get('/get-all', getAllTransactions)
transactionRoutes.get('/stats', getTransactionStats)


export { transactionRoutes }