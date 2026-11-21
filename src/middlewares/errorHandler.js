const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;

    if (statusCode === 500) {
        console.error('SERVER ERROR:', err);
    }

    return ApiResponse.error(res, {
        message: statusCode === 500
            ? "Internal Server Error"
            : err.message,
        statusCode,
    });
};

module.exports = errorHandler

