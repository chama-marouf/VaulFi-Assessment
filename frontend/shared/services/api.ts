import {
    SignupFormData,
    OtpVerificationData,
    ApiResponse,
    UserData,
    API_ENDPOINTS,
} from "../types/auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

async function fetchWithErrorHandling<T>(
    url: string,
    options: RequestInit
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: data.message || "An error occurred",
            }
        }

        return {
            success: true,
            data: data as T,
        }
    } catch (error) {
        return {
            success: false,
            error:
                error instanceof Error
                    ? error.message
                    : "Network error occurred",
        }
    }
}

// Signup API call
export async function signup(
    formData: SignupFormData
): Promise<ApiResponse<{ email: string }>> {
    return fetchWithErrorHandling<{ email: string }>(API_ENDPOINTS.SIGNUP, {
        method: "POST",
        body: JSON.stringify(formData),
    })
}

// Verify OTP API call
export async function verifyOtp(
    data: OtpVerificationData
): Promise<ApiResponse<UserData>> {
    return fetchWithErrorHandling<UserData>(API_ENDPOINTS.VERIFY_OTP, {
        method: "POST",
        body: JSON.stringify(data),
    })
}

// Resend OTP API call
export async function resendOtp(
    email: string
): Promise<ApiResponse<{ message: string }>> {
    return fetchWithErrorHandling<{ message: string }>(
        API_ENDPOINTS.RESEND_OTP,
        {
            method: "POST",
            body: JSON.stringify({ email }),
        }
    )
}
