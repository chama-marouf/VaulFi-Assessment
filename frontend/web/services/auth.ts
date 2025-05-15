import API from "@/api/api"
import {
    ApiResponse,
    SignupFormData,
    SignupResponse,
    OTPResponse,
    VerifyOTPResponse,
} from "@/types/auth"
import { AxiosError } from "axios"

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
            // Get email from localStorage or state management
            const email = localStorage.getItem("userEmail")
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
            // For demo purposes, the backend expects code '1234'
            console.log("OTP Verification Request:", { otpId, code })
            const response = await API.post<ApiResponse<VerifyOTPResponse>>(
                "/user/otp",
                {
                    otpId,
                    code,
                }
            )
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error("OTP Verification Error:", error.response?.data)
            }
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

    verifyPhoneOTP: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: "success" }
    },
}
