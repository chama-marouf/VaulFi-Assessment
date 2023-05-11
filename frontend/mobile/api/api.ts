import axios from "axios"

const API = axios.create({
    baseURL: process.env.API_URL || "http://localhost:4000",
    timeout: 10000,
})

// Add global error handling
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || "An unexpected error occurred"
        alert(message) // Replace with toast or custom error display if needed
        return Promise.reject(error)
    }
)

export default API
