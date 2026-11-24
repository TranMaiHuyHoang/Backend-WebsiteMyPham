const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const AppError = require('../utils/AppError');

class AuthController {
    // Đăng ký
    register = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        // Kiểm tra email đã tồn tại
        const userExists = await User.findOne({ email });

        if (userExists) {
            throw new AppError('Email already exists', 400);
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return ApiResponse.success(res, {
            message: 'Register successfully',
            data: {
                user: {
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            },
            statusCode: 201
        });
    });

    // Đăng nhập
    login = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401);
        }

        // Tạo JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET || 'website_my_pham_secret_key_2026@#!',
            {
                expiresIn: '1d'
            }
        );

        return ApiResponse.success(res, {
            message: 'Login successfully',
            data: {
                user: {
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                accessToken: token
            }
        });
    });
}

module.exports = new AuthController();
