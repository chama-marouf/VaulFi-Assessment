import { ValidationErrors } from "../types/auth"

// Email validation using regex
export const validateEmail = (email: string): string | undefined => {
    if (!email) {
        return "Email is required"
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address"
    }

    return undefined
}

// Password validation with complexity requirements
export const validatePassword = (password: string): string | undefined => {
    if (!password) {
        return "Password is required"
    }

    if (password.length < 8) {
        return "Password must be at least 8 characters long"
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter"
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter"
    }

    // Check for at least one number
    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one number"
    }

    // Check for at least one special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return "Password must contain at least one special character"
    }

    return undefined
}

// Phone number validation
export const validatePhoneNumber = (
    phoneNumber: string
): string | undefined => {
    if (!phoneNumber) {
        return "Phone number is required"
    }

    // Remove spaces and non-numeric characters for validation
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "")

    // Check if phone number has a valid length (adjust as needed)
    if (cleanedPhoneNumber.length < 8 || cleanedPhoneNumber.length > 15) {
        return "Please enter a valid phone number"
    }

    return undefined
}

// OTP validation
export const validateOtp = (otp: string): string | undefined => {
    if (!otp) {
        return "OTP is required"
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        return "Please enter a valid 6-digit OTP"
    }

    return undefined
}

// Validate the email and password form
export const validateEmailPasswordForm = (
    email: string,
    password: string
): ValidationErrors => {
    const errors: ValidationErrors = {}

    const emailError = validateEmail(email)
    if (emailError) {
        errors.email = emailError
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
        errors.password = passwordError
    }

    return errors
}

// Validate the phone number form
export const validatePhoneForm = (phoneNumber: string): ValidationErrors => {
    const errors: ValidationErrors = {}

    const phoneError = validatePhoneNumber(phoneNumber)
    if (phoneError) {
        errors.phoneNumber = phoneError
    }

    return errors
}

// Validate the OTP form
export const validateOtpForm = (otp: string): ValidationErrors => {
    const errors: ValidationErrors = {}

    const otpError = validateOtp(otp)
    if (otpError) {
        errors.otp = otpError
    }

    return errors
}
