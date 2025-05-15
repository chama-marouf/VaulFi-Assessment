import { useState } from "react"
import {
    signup,
    verifyOtp,
    resendOtp,
    verifyPhoneOtp,
} from "../services/authService"
import {
    SignupFormData,
    OtpVerificationData,
    ApiResponse,
    UserData,
} from "@shared/types/auth"

export type UseAuthReturn = {
    loading: boolean
    error: string | null
    signup: (data: SignupFormData) => Promise<ApiResponse<{ email: string }>>
    verifyEmailOTP: (otp: string) => Promise<ApiResponse<UserData>>
    resendEmailOTP: () => Promise<ApiResponse<{ message: string }>>
    verifyPhoneOTP: (
        otp: string
    ) => Promise<ApiResponse<{ phoneNumber: string }>>
    resendPhoneOTP: () => Promise<ApiResponse<{ message: string }>>
    login: (email: string, password: string) => Promise<void>
    logout: () => void
    isAuthenticated: boolean
    user: any | null
}

export const useAuth = (): UseAuthReturn => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<any | null>(null)

    const handleApiCall = async <T>(
        apiCall: () => Promise<ApiResponse<T>>
    ): Promise<ApiResponse<T>> => {
        try {
            setLoading(true)
            setError(null)
            const response = await apiCall()
            if (!response.success) {
                setError(response.error || "An unexpected error occurred")
            }
            return response
        } catch (err: any) {
            const errorMessage =
                err.response?.data?.message || "An unexpected error occurred"
            setError(errorMessage)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        // TODO: Implement login functionality
        throw new Error("Not implemented")
    }

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
    }

    return {
        loading,
        error,
        signup: (data) => handleApiCall(() => signup(data)),
        verifyEmailOTP: (otp) =>
            handleApiCall(() => verifyOtp({ email: user?.email, otp })),
        resendEmailOTP: () => handleApiCall(() => resendOtp(user?.email)),
        verifyPhoneOTP: (otp) =>
            handleApiCall(() => verifyPhoneOtp({ email: user?.email, otp })),
        resendPhoneOTP: () => handleApiCall(() => resendOtp(user?.email)),
        login,
        logout,
        isAuthenticated,
        user,
    }
}
