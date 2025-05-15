import React, { createContext, useContext, useState } from "react"
import { SignupFormData } from "../../shared/types/auth"
import {
    signup,
    verifyEmailOTP,
    resendEmailOTP,
    verifyPhoneOTP,
    resendPhoneOTP,
} from "../api/auth"

interface AuthContextType {
    isAuthenticated: boolean
    signup: (data: SignupFormData) => Promise<void>
    verifyEmailOTP: (otp: string) => Promise<void>
    resendEmailOTP: () => Promise<void>
    verifyPhoneOTP: (otp: string) => Promise<void>
    resendPhoneOTP: () => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleSignup = async (data: SignupFormData) => {
        await signup(data)
    }

    const handleVerifyEmailOTP = async (otp: string) => {
        await verifyEmailOTP(otp)
    }

    const handleResendEmailOTP = async () => {
        await resendEmailOTP()
    }

    const handleVerifyPhoneOTP = async (otp: string) => {
        await verifyPhoneOTP(otp)
        setIsAuthenticated(true)
    }

    const handleResendPhoneOTP = async () => {
        await resendPhoneOTP()
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
    }

    const value = {
        isAuthenticated,
        signup: handleSignup,
        verifyEmailOTP: handleVerifyEmailOTP,
        resendEmailOTP: handleResendEmailOTP,
        verifyPhoneOTP: handleVerifyPhoneOTP,
        resendPhoneOTP: handleResendPhoneOTP,
        logout: handleLogout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
