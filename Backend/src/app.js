import express from 'express'
import cors from 'cors'
import { authRoutes } from './routes/auth.routes.js'
import { categoryRoutes } from './routes/category.routes.js'
import { accountRoutes } from './routes/account.routes.js'
import { transactionRoutes } from './routes/transaction.routes.js'
import { profileRoutes } from './routes/profile.routes.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser())

app.use('/api/user/authentication', authRoutes)
app.use('/api/user/category', categoryRoutes)
app.use('/api/user/account', accountRoutes)
app.use('/api/user/transaction', transactionRoutes)
app.use('/api/user/profile', profileRoutes)

export { app }