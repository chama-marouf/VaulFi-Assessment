// OTPScreen.tsx
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import AsyncStorage from "@react-native-async-storage/async-storage"
import HelpButton from "../components/HelpButton"
import ProgressBar from "../components/ProgressBar"
import { authService, setAuthToken } from "../services/authService"
import { SignupStep } from "../types/auth"
import {
    RootStackNavigationProp,
    RootStackParamList,
} from "../types/navigation"

type FormData = {
    otp: string
}

type OTPScreenRouteProp = RouteProp<RootStackParamList, "OTPVerification">

const OTPScreen = () => {
    const navigation = useNavigation<RootStackNavigationProp>()
    const route = useRoute<OTPScreenRouteProp>()
    const [loading, setLoading] = React.useState(false)
    const [resendLoading, setResendLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true)
            setError(null)
            const otpId = await AsyncStorage.getItem("otpId")
            if (!otpId) {
                throw new Error("OTP session expired. Please try again.")
            }

            const response = await authService.verifyOTP(otpId, data.otp)
            if (response.status === "success" && response.data?.verified) {
                if (response.data.token) {
                    await setAuthToken(response.data.token)
                }
                navigation.navigate("SignupSuccess")
            } else {
                setError(response.message || "OTP verification failed")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    const handleResendOTP = async () => {
        try {
            setResendLoading(true)
            setError(null)
            const otpId = await AsyncStorage.getItem("otpId")
            if (!otpId) {
                throw new Error("OTP session expired. Please try again.")
            }

            const response = await authService.resendOTP(otpId)
            if (response.status === "success" && response.data) {
                await AsyncStorage.setItem("otpId", response.data.otpId)
            } else {
                setError(response.message || "Failed to resend OTP")
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setResendLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}>
                    <Ionicons name='arrow-back' size={24} color='#000' />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Verify OTP</Text>
                <HelpButton />
            </View>

            <ProgressBar
                currentStep={SignupStep.OTP_VERIFICATION}
                totalSteps={4}
            />
            <Text style={styles.stepIndicator}>3 of 4</Text>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Enter Verification Code</Text>
                <Text style={styles.subtitle}>
                    We've sent a 4-digit code to your phone number
                </Text>

                <Controller
                    control={control}
                    rules={{
                        required: "OTP is required",
                        pattern: {
                            value: /^[0-9]{4}$/,
                            message: "Please enter a valid 4-digit code",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.otp && styles.inputError,
                                ]}
                                placeholder='Enter 4-digit code'
                                keyboardType='number-pad'
                                maxLength={4}
                                onChangeText={onChange}
                                value={value}
                            />
                            {errors.otp && (
                                <Text style={styles.errorText}>
                                    {errors.otp.message}
                                </Text>
                            )}
                        </View>
                    )}
                    name='otp'
                />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleSubmit(onSubmit)}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color='#fff' />
                    ) : (
                        <Text style={styles.primaryButtonText}>Verify</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.resendButton}
                    onPress={handleResendOTP}
                    disabled={resendLoading}>
                    {resendLoading ? (
                        <ActivityIndicator color='#000080' />
                    ) : (
                        <Text style={styles.resendButtonText}>Resend Code</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    backButton: {
        width: 30,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    stepIndicator: {
        fontSize: 12,
        color: "#666",
        textAlign: "right",
        paddingHorizontal: 20,
        marginTop: 5,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000080",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    inputError: {
        borderColor: "#ff0000",
    },
    errorText: {
        color: "#ff0000",
        fontSize: 12,
        marginTop: 5,
    },
    primaryButton: {
        backgroundColor: "#000080",
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    resendButton: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    resendButtonText: {
        color: "#000080",
        fontSize: 14,
    },
})

export default OTPScreen
