import API, { API_ENDPOINTS } from "../api/api"
import {
    SignupFormData,
    OtpVerificationData,
    ApiResponse,
    UserData,
} from "@shared/types/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Types
export interface SignupData {
    email: string
    password: string
}

export interface PhoneVerificationData {
    phoneNumber: string
    countryCode: string
}

// API endpoints
export const signup = async (
    data: SignupFormData
): Promise<ApiResponse<{ email: string }>> => {
    const response = await API.post(API_ENDPOINTS.SIGNUP, data)
    return response.data
}

export const verifyOtp = async (
    data: OtpVerificationData
): Promise<ApiResponse<UserData>> => {
    const response = await API.post(API_ENDPOINTS.VERIFY_OTP, data)
    return response.data
}

export const verifyPhoneNumber = async (
    data: PhoneVerificationData
): Promise<ApiResponse<{ phoneNumber: string }>> => {
    const response = await API.post("/auth/verify-phone", data)
    return response.data
}

export const verifyPhoneOtp = async (
    data: OtpVerificationData
): Promise<ApiResponse<{ phoneNumber: string }>> => {
    const response = await API.post("/auth/verify-phone-otp", data)
    return response.data
}

export const resendOtp = async (
    email: string
): Promise<ApiResponse<{ message: string }>> => {
    const response = await API.post(API_ENDPOINTS.RESEND_OTP, { email })
    return response.data
}

// Token management
export const setAuthToken = async (token: string) => {
    try {
        await AsyncStorage.setItem("token", token)
    } catch (error) {
        console.error("Error saving token:", error)
    }
}

export const getAuthToken = async () => {
    try {
        return await AsyncStorage.getItem("token")
    } catch (error) {
        console.error("Error getting token:", error)
        return null
    }
}

export const removeAuthToken = async () => {
    try {
        await AsyncStorage.removeItem("token")
    } catch (error) {
        console.error("Error removing token:", error)
    }
}
