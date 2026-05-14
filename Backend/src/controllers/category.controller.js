import { Category } from "../models/category.model.js";
import jwt from 'jsonwebtoken'

async function addCategory(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            messgae: 'Refresh token not found, Unauthorized user !'
        })
    }
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)
    const { name, type } = req.body

    if (!name) {
        return res.status(400).json({
            message: 'Category name is required'
        })
    }

    const newCategory = await Category.create({
        userId: id,
        name: name,
        type: type
    })
    return res.status(201).json({
        message: 'New Category created successfully',
        newCategory
    })
}

async function deleteCategory(req, res) {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token not found. Unauthorized user!"
            });
        }

        // Verify token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // Get category name
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        // Delete category
        const result = await Category.deleteOne({
            userId: decoded.id,
            name: name
        });

        // Check if category existed
        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        return res.status(200).json({
            message: `${name} category deleted successfully`
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Server error"
        });
    }
}


async function getAllCategory(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            messgae: 'Refresh token not found, Unauthorized user !'
        })
    }
    const { id } = jwt.verify(refreshToken, process.env.JWT_SECRET)

    const results = await Category.find({ userId: id })
    return res.status(200).json({
        message: 'All categories get successfully',
        results
    })
}


export { addCategory, deleteCategory, getAllCategory }