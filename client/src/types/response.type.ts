export type ApiResponse<T> = {
    data: T
    success: boolean
    message: string
}

export type ApiResponseWithoutData = {
    success: boolean
    message: string
}
