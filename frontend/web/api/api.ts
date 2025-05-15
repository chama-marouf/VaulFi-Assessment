import axios from "axios"

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

// Add global error handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || "An unexpected error occurred"
        console.error("API Error:", message)
        return Promise.reject(error)
    }
)

export default API
