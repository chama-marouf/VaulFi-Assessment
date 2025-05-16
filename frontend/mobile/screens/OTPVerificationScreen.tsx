import React, { useState } from "react"
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
import HelpButton from "../components/HelpButton"
import ProgressBar from "../components/ProgressBar"
import { useAuth } from "../hooks/useAuth"
import { RootStackParamList } from "../types/navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type FormData = {
    otp: string
}

type OTPVerificationScreenRouteProp = RouteProp<
    RootStackParamList,
    "OTPVerification"
>

const OTPVerificationScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const route = useRoute<OTPVerificationScreenRouteProp>()
    const { verifyOTP, loading, error } = useAuth()

    // Log route params when component mounts
    React.useEffect(() => {
        console.log("OTPVerificationScreen route params:", route.params)
    }, [route.params])

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>()

    const onSubmit = async (data: FormData) => {
        try {
            console.log("Submitting OTP verification with:", {
                otpId: route.params.otpId,
                code: data.otp,
            })
            const response = await verifyOTP(route.params.otpId, data.otp)
            if (response.status === "success") {
                navigation.navigate("SignupSuccess")
            }
        } catch (err) {
            console.error("OTP verification failed:", err)
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

            <ProgressBar currentStep={3} totalSteps={4} />
            <Text style={styles.stepIndicator}>3 of 4</Text>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Enter Verification Code</Text>
                <Text style={styles.subtitle}>
                    We've sent a 4-digit code to {route.params.phoneNumber}
                </Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

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
                        <View style={styles.otpContainer}>
                            <TextInput
                                style={[
                                    styles.otpInput,
                                    errors.otp && styles.inputError,
                                ]}
                                placeholder='Enter 4-digit code'
                                keyboardType='number-pad'
                                maxLength={4}
                                onChangeText={onChange}
                                value={value}
                                editable={!loading}
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

                <TouchableOpacity
                    style={[
                        styles.primaryButton,
                        loading && styles.disabledButton,
                    ]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color='#fff' />
                    ) : (
                        <Text style={styles.primaryButtonText}>Verify</Text>
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
    otpContainer: {
        marginBottom: 20,
    },
    otpInput: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        textAlign: "center",
    },
    inputError: {
        borderColor: "#ff3b30",
    },
    errorText: {
        color: "#ff3b30",
        fontSize: 12,
        marginTop: 5,
    },
    primaryButton: {
        backgroundColor: "#000080",
        borderRadius: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    disabledButton: {
        opacity: 0.7,
    },
})

export default OTPVerificationScreen
