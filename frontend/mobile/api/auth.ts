import { SignupFormData } from "../../shared/types/auth"
import api from "./api"

export const signup = async (data: SignupFormData) => {
    const response = await api.post("/auth/signup", data)
    return response.data
}

export const verifyEmailOTP = async (otp: string) => {
    const response = await api.post("/auth/verify-email-otp", { otp })
    return response.data
}

export const resendEmailOTP = async () => {
    const response = await api.post("/auth/resend-email-otp")
    return response.data
}

export const verifyPhoneOTP = async (otp: string) => {
    const response = await api.post("/auth/verify-phone-otp", { otp })
    return response.data
}

export const resendPhoneOTP = async () => {
    const response = await api.post("/auth/resend-phone-otp")
    return response.data
}
