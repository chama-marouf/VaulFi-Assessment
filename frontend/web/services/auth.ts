export const authService = {
    signup: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: "success" }
    },

    verifyPhone: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: "success" }
    },

    verifyOTP: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: "success" }
    },

    resendOTP: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: "success" }
    },

    verifyPhoneOTP: async () => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: "success" }
    },
}
