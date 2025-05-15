export enum SignupStep {
    EMAIL_PASSWORD = "EMAIL_PASSWORD",
    PHONE_NUMBER = "PHONE_NUMBER",
    OTP_VERIFICATION = "OTP_VERIFICATION",
    SUCCESS = "SUCCESS",
}

export interface SignupFormData {
    email: string
    password: string
    phoneNumber: string
    countryCode: string
}

export interface ValidationErrors {
    email?: string
    password?: string
    phoneNumber?: string
    otp?: string
}
