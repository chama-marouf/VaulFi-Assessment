import axios from "axios"
import Constants from "expo-constants"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Platform } from "react-native"

// Get the API URL from environment variables or use a default
const getApiUrl = () => {
    const envUrl = Constants.expoConfig?.extra?.apiUrl
    if (envUrl) return envUrl

    // Default URLs for different platforms
    if (Platform.OS === "android") {
        return "http://10.0.2.2:3000" // Android emulator
    }
    return "http://localhost:3000" // iOS simulator
}

const API_URL = getApiUrl()

console.log("API URL:", API_URL) // For debugging

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
            const token = await AsyncStorage.getItem("authToken")
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
        if (error.message === "Network Error") {
            console.error(
                "Network Error - Unable to connect to API at:",
                API_URL
            )
        }
        const message =
            error.response?.data?.message || "An unexpected error occurred"
        console.error("API Error:", message)
        return Promise.reject(error)
    }
)

export default API
