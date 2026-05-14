import { Account } from "../models/account.model.js";
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

async function addAccount(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            messgae: 'Refresh token not found, Unauthorized user !'
        })
    }
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)
    const { name, accountBalance } = req.body

    if (!name) {
        return res.status(400).json({
            message: 'Account name is required'
        })
    }

    const newAccount = await Account.create({
        userId: id,
        name,
        accountBalance
    })
    const updateUserBalance = await User.findByIdAndUpdate(
        id,
        {
            $inc: { balance: accountBalance }
        },
        { new: true }
    );

    return res.status(201).json({
        message: 'New Account created successfully',
        newAccount
    })
}

async function deleteAccount(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token not found. Unauthorized user!"
            });
        }
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Account name is required"
            });
        }
      
        const account = await Account.findOne({
            userId: decoded.id,
            name: name
        });
        if (!account) {
            return res.status(404).json({
                message: "Account not found"
            });
        }
        const accountBalance = account.accountBalance;

        const result = await Account.deleteOne({
            userId: decoded.id,
            name: name
        });


        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Account not found"
            });
        }
        const updateUserBalance = await User.findByIdAndUpdate(
            decoded.id,
            {
                $inc: { balance: -accountBalance }
            },
            { new: true }
        );

        return res.status(200).json({
            message: `${name} account deleted successfully`
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error"
        });
    }
}

async function getAllAccount(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            messgae: 'Refresh token not found, Unauthorized user !'
        })
    }
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)

    const results = await Account.find({ userId: id })
    return res.status(200).json({
        message: 'All accounts get successfully',
        results
    })
}


export { addAccount, deleteAccount, getAllAccount }