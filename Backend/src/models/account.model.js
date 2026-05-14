import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
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
    accountBalance: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

const Account = mongoose.model('Account', accountSchema)
export { Account }