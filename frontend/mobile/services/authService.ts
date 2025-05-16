import API from "../api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    ApiResponse,
    SignupFormData,
    SignupResponse,
    OTPResponse,
    VerifyOTPResponse,
} from "../types/auth"

export const authService = {
    signup: async (
        data: SignupFormData
    ): Promise<ApiResponse<SignupResponse>> => {
        try {
            const response = await API.post<ApiResponse<SignupResponse>>(
                "/user",
                {
                    email: data.email,
                    password: data.password,
                }
            )
            return response.data
        } catch (error) {
            throw error
        }
    },

    verifyPhone: async (
        phoneNumber: string
    ): Promise<ApiResponse<OTPResponse>> => {
        try {
            // Get email from AsyncStorage
            const email = await AsyncStorage.getItem("userEmail")
            if (!email) {
                throw new Error("Email not found. Please sign up again.")
            }

            const response = await API.put<ApiResponse<OTPResponse>>("/user", {
                email,
                phoneNumber,
            })
            return response.data
        } catch (error) {
            throw error
        }
    },

    verifyOTP: async (
        otpId: string,
        code: string
    ): Promise<ApiResponse<VerifyOTPResponse>> => {
        try {
            console.log("Verifying OTP with params:", { otpId, code })
            const response = await API.post<ApiResponse<VerifyOTPResponse>>(
                "/user/otp",
                {
                    otpId,
                    code,
                }
            )
            console.log("OTP verification response:", response.data)
            return response.data
        } catch (error: any) {
            console.error("OTP Verification Error Details:", {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                requestData: { otpId, code },
            })
            throw error
        }
    },

    resendOTP: async (otpId: string): Promise<ApiResponse<OTPResponse>> => {
        try {
            const response = await API.post<ApiResponse<OTPResponse>>(
                "/user/otp/resend",
                {
                    otpId,
                }
            )
            return response.data
        } catch (error) {
            throw error
        }
    },
}

// Token management
export const setAuthToken = async (token: string) => {
    try {
        await AsyncStorage.setItem("authToken", token)
    } catch (error) {
        console.error("Error saving token:", error)
    }
}

export const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem("authToken")
    } catch (error) {
        console.error("Error getting token:", error)
        return null
    }
}

export const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem("authToken")
    } catch (error) {
        console.error("Error removing token:", error)
    }
}
