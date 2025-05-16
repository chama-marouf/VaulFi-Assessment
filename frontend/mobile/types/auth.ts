export interface ApiResponse<T> {
    status: string
    message?: string
    data?: T
}

export interface SignupFormData {
    email: string
    password: string
    phoneNumber?: string
    countryCode?: string
}

export interface SignupResponse {
    email: string
    otpId?: string
}

export interface OTPResponse {
    otpId: string
    expiresAt: string
}

export interface VerifyOTPResponse {
    verified: boolean
    token?: string
}

export enum SignupStep {
    SIGNUP = 1,
    PHONE_NUMBER = 2,
    OTP_VERIFICATION = 3,
    SUCCESS = 4,
}
