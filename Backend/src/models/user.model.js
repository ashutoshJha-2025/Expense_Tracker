import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already taken'],
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already exists'],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    currency: {
        type: String,
        default: 'USD',
        uppercase: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
export { User }