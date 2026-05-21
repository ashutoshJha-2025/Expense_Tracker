import { Transaction } from "../models/transaction.model.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import { Account } from "../models/account.model.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

async function createTransaction(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Refresh token not found, Unauthorized user !'
        })
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
    const { title, description, type, amount, categoryName, accountName } = req.body

    const categoryId = await Category.findOne({ name: categoryName, userId: decoded.id, type: type })
    const accountId = await Account.findOne({ name: accountName, userId: decoded.id })


    const newTransaction = await Transaction.create({
        userId: decoded.id,
        title,
        description,
        type,
        amount,
        categoryId: categoryId._id,
        accountId: accountId._id,
    })

    await debitCreditHandler(type, amount, decoded, categoryId, accountId)

    return res.status(201).json({
        message: 'Transaction created successfully',
        newTransaction
    })
}

async function getAllTransactions(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Refresh token not found, Unauthorized user !'
        })
    }
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)

    const results = await Transaction.find({ userId: id }).populate('categoryId', 'name type').populate('accountId', 'name accountBalance').sort({ createdAt: -1 });
    return res.status(200).json({
        message: 'All transactions get successfully',
        results
    })
}


async function debitCreditHandler(type, amount, decoded, categoryId, accountId) {

    if (type === 'Income') {
        await User.findByIdAndUpdate(
            decoded.id,
            { $inc: { balance: Number(amount) } },
            { new: true }
        )

        await Account.findByIdAndUpdate(
            accountId._id,
            { $inc: { accountBalance: Number(amount) } },
            { new: true }
        )

    } else if (type === 'Expense') {

        await User.findByIdAndUpdate(
            decoded.id,
            { $inc: { balance: -Number(amount) } },
            { new: true }
        )

        await Account.findByIdAndUpdate(
            accountId._id,
            { $inc: { accountBalance: -Number(amount) } },
            { new: true }
        )

    } else if (type === 'Transfer') {

        await Account.findByIdAndUpdate(
            accountId._id,
            { $inc: { accountBalance: -Number(amount) } },
            { new: true }
        )

        await Account.findByIdAndUpdate(
            categoryId._id,
            { $inc: { accountBalance: Number(amount) } },
            { new: true }
        )

    }
}

async function getTransactionStats(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Refresh token not found, Unauthorized user !'
        })
    }
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)

    const totalBalance = await User.findById(id).select('balance -_id');

    const stats = await Transaction.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(id) } },
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
            $group: {
                _id: '$category.type',
                total: { $sum: '$amount' }
            }
        }
    ]);

    res.status(200).json({
        message: 'Transaction stats fetched successfully',
        stats,
        totalBalance
    })
}


export { createTransaction, getAllTransactions, getTransactionStats }