import { Transaction } from "../models/transaction.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

async function getMe(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Unauthorized user, login/register to continue !'
        })
    }
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)

    const user = await User.findById(id)

    const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
    );

    const endOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        1
    );

    const result = await Transaction.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(id),
                createdAt: {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                }
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        { $unwind: '$category' },

        {
            $match: {
                'category.type': 'Expense'
            }
        },

        {
            $group: {
                _id: null,
                totalExpense: { $sum: '$amount' },
                totalTransactions: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                totalExpense: 1,
                totalTransactions: 1
            }
        }
    ]);

    res.status(200).json({
        message: 'Get Me fetched successfully',
        user,
        result
    })
}

async function setCurrency(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Refresh token not found, Unauthorized user !'
        })
    }
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)
    const currency = req.body.currency

    await User.findByIdAndUpdate(
        id,
        { currency: currency },
        { new: true }
    )

    res.status(200).json({
        message: 'Currency updated successfully',
    })
}

export { getMe, setCurrency }