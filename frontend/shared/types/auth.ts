// Types for authentication and signup
export interface SignupFormData {
    email: string
    password: string
    phoneNumber: string
    countryCode: string
}

export interface OtpVerificationData {
    otp: string
    email: string
}

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
}

export interface UserData {
    id: string
    email: string
    phoneNumber: string
}

// Form validation error types
export interface ValidationErrors {
    email?: string
    password?: string
    phoneNumber?: string
    otp?: string
}

// API endpoints
export const API_ENDPOINTS = {
    SIGNUP: "/api/auth/signup",
    VERIFY_OTP: "/api/auth/verify-otp",
    RESEND_OTP: "/api/auth/resend-otp",
}

// Signup process steps
export enum SignupStep {
    EMAIL_PASSWORD = "EMAIL_PASSWORD",
    PHONE_NUMBER = "PHONE_NUMBER",
    OTP_VERIFICATION = "OTP_VERIFICATION",
    SUCCESS = "SUCCESS",
}
