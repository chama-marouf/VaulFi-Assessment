import { ValidationErrors } from "../types/auth"

export const validateEmailPasswordForm = (
    email: string,
    password: string
): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {}

    if (!email) {
        errors.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        errors.email = "Invalid email address"
    }

    if (!password) {
        errors.password = "Password is required"
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters"
    } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            password
        )
    ) {
        errors.password =
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}

export const validatePhoneNumber = (
    phoneNumber: string,
    countryCode: string
): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {}

    if (!phoneNumber) {
        errors.phoneNumber = "Phone number is required"
    } else if (!/^[0-9]{10}$/.test(phoneNumber)) {
        errors.phoneNumber = "Phone number must be 10 digits"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}

export const validateOTP = (
    otp: string
): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {}

    if (!otp) {
        errors.otp = "OTP is required"
    } else if (!/^[0-9]{6}$/.test(otp)) {
        errors.otp = "OTP must be 6 digits"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}
