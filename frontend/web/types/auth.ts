export enum SignupStep {
    EMAIL_PASSWORD = "EMAIL_PASSWORD",
    PHONE_NUMBER = "PHONE_NUMBER",
    OTP_VERIFICATION = "OTP_VERIFICATION",
    SUCCESS = "SUCCESS",
}

export interface SignupFormData {
    email: string
    password: string
    phoneNumber?: string
    countryCode?: string
}

export interface ValidationErrors {
    email?: string
    password?: string
    phoneNumber?: string
    otp?: string
}

export interface ApiResponse<T = any> {
    status: "success" | "error"
    data?: T
    message?: string
}

export interface SignupResponse {
    userId: string
    email: string
    phoneNumber: string
}

export interface OTPResponse {
    otpId: string
    expiresAt: string
}

export interface VerifyOTPResponse {
    verified: boolean
    token?: string
}
