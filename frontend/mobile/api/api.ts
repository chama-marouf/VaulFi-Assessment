import axios from "axios"
import Constants from "expo-constants"
import { API_ENDPOINTS } from "@shared/types/auth"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Get the API URL from environment variables or use a default
const API_URL = Constants.expoConfig?.extra?.apiUrl || "http://localhost:3001"

const API = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

// Request interceptor for adding auth token
API.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("token")
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        } catch (error) {
            console.error("Error getting token:", error)
            return config
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor for handling errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || "An unexpected error occurred"

        // Handle specific error cases
        if (error.response?.status === 401) {
            // Handle unauthorized access

            console.log("Unauthorized access")
        } else if (error.response?.status === 403) {
            // Handle forbidden access
            console.log("Forbidden access")
        }

        console.error(message)

        return Promise.reject(error)
    }
)

export { API_ENDPOINTS }
export default API
