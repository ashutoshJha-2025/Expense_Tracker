import { User } from "../models/user.model.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Session } from "../models/session.model.js";

async function userRegister(req, res) {
    const { name, email, password } = req.body

    const userAlreadyExists = await User.findOne({
        $or: [
            { name },
            { email }
        ]
    })
    if (userAlreadyExists) {
        return res.status(409).json({
            message: 'Username or Email already exists'
        })
    }

    const hashPassword = crypto.createHash('sha256').update(password).digest('hex')
    const newUser = await User.create({
        name,
        email,
        password: hashPassword
    })

    const refreshToken = jwt.sign({
        id: newUser._id
    }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    const session = await Session.create({
        userId: newUser._id,
        refreshTokenHash: refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    return res.status(201).json({
        message: 'User regitered successfully',
        user: newUser,
    })
}

async function userLogin(req, res) {
    const { name, email, password } = req.body

    const isUserExists = await User.findOne({ email })
    if (!isUserExists) {
        return res.status(409).json({
            message: 'Invalid email '
        })
    }

    const hashPassword = crypto.createHash('sha256').update(password).digest('hex')
    const isPasswordValid = hashPassword === isUserExists.password
    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Wrong Password'
        })
    }

    const refreshToken = jwt.sign({
        id: isUserExists._id
    }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')
    const session = await Session.create({
        userId: isUserExists._id,
        refreshTokenHash: refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers['user-agent']
    })

    return res.status(201).json({
        message: 'User Login successfully',
        user: isUserExists,
    })
}

async function logoutAll(req, res) {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(400).json({
            message: 'Refresh token not found'
        })
    }
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
    await Session.updateMany(
        {
            userId: decoded.id,
            revoked: false
        },
        {
            $set: { revoked: true }
        }
    )
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    return res.status(200).json({
        message: 'Logout from all devices successfully'
    })
}

export { userRegister, logoutAll, userLogin }