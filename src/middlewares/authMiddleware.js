const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Please login first', 401);
    }

    // Lấy Token từ Authorization Header
    const token = authHeader.split(' ')[1];

    // Xác minh Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded)

    // Gắn thông tin user vào request
    req.user = decoded;

    next();
});

module.exports = authMiddleware;
