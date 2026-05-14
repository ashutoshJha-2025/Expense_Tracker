import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        capitalize: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['Income', 'Expense'],
        required: true,
    },
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema)
export { Category }