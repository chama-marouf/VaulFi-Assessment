interface EmailPasswordValidationResult {
    isValid: boolean
    errors: {
        email?: string
        password?: string
    }
}

export const validateEmailPasswordForm = (
    email: string,
    password: string
): EmailPasswordValidationResult => {
    const errors: { email?: string; password?: string } = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
        errors.email = "Email is required"
    } else if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!password) {
        errors.password = "Password is required"
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters long"
    } else if (!/[A-Z]/.test(password)) {
        errors.password = "Password must contain at least one uppercase letter"
    } else if (!/[a-z]/.test(password)) {
        errors.password = "Password must contain at least one lowercase letter"
    } else if (!/[0-9]/.test(password)) {
        errors.password = "Password must contain at least one number"
    } else if (!/[!@#$%^&*]/.test(password)) {
        errors.password =
            "Password must contain at least one special character (!@#$%^&*)"
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    }
}
