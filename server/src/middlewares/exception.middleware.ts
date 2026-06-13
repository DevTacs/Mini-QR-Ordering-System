import type {Request, Response, NextFunction} from "express"

export const exceptionMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.status || err.statusCode || 500

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal server error",
    })
}
