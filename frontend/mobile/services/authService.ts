import API from "../api/api"

export const signup = async (email: string, password: string) => {
    return API.post("/signup", { email, password })
}

export const verifyOtp = async (otp: string) => {
    return API.post("/verify-otp", { otp })
}
