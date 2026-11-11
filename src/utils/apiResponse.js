class ApiResponse {
    static success(res, { message = "Success", data = null, statusCode = 200, meta = null } = {}) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            ...(meta && { meta })
        })
    }

    static error(res, { message = "Something went error", statusCode = 500, error = null } = {}) {
        return res.status(statusCode).json({
            success: false,
            message,
            ...(error && { error })
        })
    }
}

module.exports = ApiResponse;