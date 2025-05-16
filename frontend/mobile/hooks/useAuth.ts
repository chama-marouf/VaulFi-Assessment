import { useState } from "react"
import { authService } from "../services/authService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    SignupFormData,
    ApiResponse,
    SignupResponse,
    OTPResponse,
    VerifyOTPResponse,
} from "../types/auth"

export type UseAuthReturn = {
    loading: boolean
    error: string | null
    signup: (data: SignupFormData) => Promise<ApiResponse<SignupResponse>>
    verifyPhone: (phoneNumber: string) => Promise<ApiResponse<OTPResponse>>
    verifyOTP: (
        otpId: string,
        code: string
    ) => Promise<ApiResponse<VerifyOTPResponse>>
    resendOTP: (otpId: string) => Promise<ApiResponse<OTPResponse>>
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
            if (response.status !== "success") {
                setError(response.message || "An unexpected error occurred")
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
        signup: (data) => handleApiCall(() => authService.signup(data)),
        verifyPhone: (phoneNumber) =>
            handleApiCall(() => authService.verifyPhone(phoneNumber)),
        verifyOTP: (otpId, code) =>
            handleApiCall(() => authService.verifyOTP(otpId, code)),
        resendOTP: (otpId) => handleApiCall(() => authService.resendOTP(otpId)),
        login,
        logout,
        isAuthenticated,
        user,
    }
}
