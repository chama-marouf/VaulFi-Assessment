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
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import HelpButton from "../components/HelpButton"
import ProgressBar from "../components/ProgressBar"
import { useAuth } from "../hooks/useAuth"
import { SignupStep } from "@shared/types/auth"

type FormData = {
    email: string
    password: string
    confirmPassword: string
}

const SignupScreen = () => {
    const navigation = useNavigation()
    const { signup, loading, error } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data: FormData) => {
        try {
            const response = await signup({
                email: data.email,
                password: data.password,
                phoneNumber: "", // Will be collected in the next step
                countryCode: "", // Will be collected in the next step
            })
            if (response.success) {
                // Navigate to phone number step
                navigation.navigate("PhoneNumber", {
                    email: data.email,
                    password: data.password,
                })
            }
        } catch (err) {
            // Error is handled by the useAuth hook
            console.error("Signup failed:", err)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: 30 }} />
                <Text style={styles.headerTitle}>Sign Up</Text>
                <HelpButton />
            </View>

            <ProgressBar currentStep={1} totalSteps={4} />
            <Text style={styles.stepIndicator}>1 of 4</Text>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Create an account</Text>
                <Text style={styles.subtitle}>
                    Sign up now to get started with us.
                </Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <Text style={styles.inputLabel}>Email</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please enter a valid email",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View
                            style={[
                                styles.inputContainer,
                                errors.email && styles.inputContainerError,
                            ]}>
                            <TextInput
                                style={styles.input}
                                placeholder='example@gmail.com'
                                value={value}
                                onChangeText={onChange}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                editable={!loading}
                            />
                        </View>
                    )}
                    name='email'
                />
                {errors.email && (
                    <Text style={styles.fieldError}>
                        {errors.email.message}
                    </Text>
                )}

                <Text style={styles.inputLabel}>Password</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message:
                                "Password must be at least 8 characters long",
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View
                            style={[
                                styles.inputContainer,
                                errors.password && styles.inputContainerError,
                            ]}>
                            <TextInput
                                style={styles.input}
                                placeholder='••••••••••••••'
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={!showPassword}
                                editable={!loading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                disabled={loading}
                                style={styles.eyeIcon}>
                                <Ionicons
                                    name={
                                        showPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    size={18}
                                    color='#666'
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    name='password'
                />
                {errors.password && (
                    <Text style={styles.fieldError}>
                        {errors.password.message}
                    </Text>
                )}

                <Text style={styles.inputLabel}>Confirm password</Text>
                <Controller
                    control={control}
                    rules={{
                        required: "Please confirm your password",
                        validate: (value) =>
                            value === watch("password") ||
                            "Passwords do not match",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View
                            style={[
                                styles.inputContainer,
                                errors.confirmPassword &&
                                    styles.inputContainerError,
                            ]}>
                            <TextInput
                                style={styles.input}
                                placeholder='••••••••••••••'
                                value={value}
                                onChangeText={onChange}
                                secureTextEntry={!showConfirmPassword}
                                editable={!loading}
                            />
                            <TouchableOpacity
                                onPress={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                disabled={loading}
                                style={styles.eyeIcon}>
                                <Ionicons
                                    name={
                                        showConfirmPassword
                                            ? "eye-off-outline"
                                            : "eye-outline"
                                    }
                                    size={18}
                                    color='#666'
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    name='confirmPassword'
                />
                {errors.confirmPassword && (
                    <Text style={styles.fieldError}>
                        {errors.confirmPassword.message}
                    </Text>
                )}

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
                        <Text style={styles.primaryButtonText}>Continue</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Already have an account?{" "}
                    </Text>
                    <TouchableOpacity disabled={loading}>
                        <Text style={styles.footerLink}>Sign in</Text>
                    </TouchableOpacity>
                </View>
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
    inputLabel: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 50,
        height: 50,
        paddingHorizontal: 15,
        alignItems: "center",
        marginBottom: 5,
    },
    inputContainerError: {
        borderColor: "#FF0000",
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 5,
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
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: "#666",
    },
    footerLink: {
        fontSize: 14,
        color: "#000080",
        fontWeight: "600",
    },
    errorText: {
        color: "#FF0000",
        fontSize: 14,
        marginBottom: 15,
        textAlign: "center",
    },
    fieldError: {
        color: "#FF0000",
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5,
    },
    disabledButton: {
        opacity: 0.7,
    },
})

export default SignupScreen
