import { compare } from 'bcrypt'
import jwt from "jsonwebtoken"
import crypto from 'crypto'
import { User } from "../user/user.models.js"
import { NotFoundException } from '../exception/notFound.exception.js'
import { ConflictException } from '../exception/conflict.exception.js'
import { sendEmail } from '../utils/send-email.utils.js'
import { config } from 'dotenv';
config()
import { hash } from 'bcrypt'

class AuthController {
    #_model
    constructor() {
        this.#_model = User
    }
    // Login 
    signin = async (req, res) => {
        const { username, password } = req.body
        const user = await this.#_model.findOne({ username })
        const check_pass = await compare(password, user.password)
        if (!user || !check_pass) {
            return res.status(400).send({ message: "Invalid username or password" })
        }
        const accessToken = jwt.sign(
            {
                id: user._id, username: user.username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRE_TIME
            }
        )
        res.status(200).send({ message: "Successfully signed in", accessToken })
    }
    resetPassword = async (req, res) => {
        const { newPassword } = req.body
        const { token } = req.params;
        const user = await this.#_model.findOne({ passwordResetToken: token })
        if (!user) {
            throw new NotFoundException("User not found")
        }
        if (user.passwordResetTokenExpireTime - Date.now() < 0) {
            throw new ConflictException("Password reset token has expired")
        }
        const hashed_pass = await hash(newPassword, 7)
        await this.#_model.findByIdAndUpdate(user._id, {
            password: hashed_pass,
            passwordResetToken: null,
            passwordResetTokenExpireTime: null,
        })
        res.status(200).send({ message: "Password successfully reset" })
    }

    forgotPassword = async (req, res) => {
        const { email } = req.body
        const user = await this.#_model.findOne({ email })
        if (!user) {
            throw new NotFoundException("User not found")
        }
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/reset-password/${resetToken}`;
        const options = {
            from: process.env.FROM_MAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: `<p>To reset your password, please click on the following link:</p>
                   <a href="${resetUrl}">Reset Password</a>`
        }
        await sendEmail(options);
        const newPassword = await this.#_model.findByIdAndUpdate(user._id, {
            passwordResetToken: resetToken,
            passwordResetTokenExpireTime: Date.now() + 3600000
        });
        res.render('pages/forgotPassword', { message: "Email has been sent!" });

        return res.status(200).send({ message: "Password reset link sent to your email", password: newPassword })
    }
}

export default new AuthController()