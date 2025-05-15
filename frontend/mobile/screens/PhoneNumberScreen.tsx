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
import HelpButton from "../components/HelpButton"
import ProgressBar from "../components/ProgressBar"
import { useAuth } from "../hooks/useAuth"
import {
    RootStackNavigationProp,
    RootStackParamList,
} from "../types/navigation"

type FormData = {
    phoneNumber: string
    countryCode: string
}

type PhoneNumberScreenRouteProp = RouteProp<RootStackParamList, "PhoneNumber">

const PhoneNumberScreen = () => {
    const navigation = useNavigation<RootStackNavigationProp>()
    const route = useRoute<PhoneNumberScreenRouteProp>()
    const { signup } = useAuth()
    const [loading, setLoading] = React.useState(false)
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
            await signup({
                email: route.params.email,
                password: route.params.password,
                phoneNumber: data.phoneNumber,
                countryCode: data.countryCode,
            })
            navigation.navigate("OTP", {
                email: route.params.email,
                phoneNumber: data.phoneNumber,
                countryCode: data.countryCode,
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred")
        } finally {
            setLoading(false)
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
                <Text style={styles.headerTitle}>Phone Number</Text>
                <HelpButton />
            </View>

            <ProgressBar currentStep={2} totalSteps={4} />
            <Text style={styles.stepIndicator}>2 of 4</Text>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Enter Phone Number</Text>
                <Text style={styles.subtitle}>
                    We'll send you a verification code
                </Text>

                <View style={styles.phoneInputContainer}>
                    <Controller
                        control={control}
                        rules={{
                            required: "Country code is required",
                        }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.countryCodeContainer}>
                                <TextInput
                                    style={[
                                        styles.countryCodeInput,
                                        errors.countryCode && styles.inputError,
                                    ]}
                                    placeholder='+1'
                                    keyboardType='phone-pad'
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.countryCode && (
                                    <Text style={styles.errorText}>
                                        {errors.countryCode.message}
                                    </Text>
                                )}
                            </View>
                        )}
                        name='countryCode'
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid phone number",
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.phoneNumberContainer}>
                                <TextInput
                                    style={[
                                        styles.phoneNumberInput,
                                        errors.phoneNumber && styles.inputError,
                                    ]}
                                    placeholder='Phone Number'
                                    keyboardType='phone-pad'
                                    onChangeText={onChange}
                                    value={value}
                                />
                                {errors.phoneNumber && (
                                    <Text style={styles.errorText}>
                                        {errors.phoneNumber.message}
                                    </Text>
                                )}
                            </View>
                        )}
                        name='phoneNumber'
                    />
                </View>

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleSubmit(onSubmit)}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color='#fff' />
                    ) : (
                        <Text style={styles.primaryButtonText}>Continue</Text>
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
    phoneInputContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    countryCodeContainer: {
        width: 80,
        marginRight: 10,
    },
    countryCodeInput: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    phoneNumberContainer: {
        flex: 1,
    },
    phoneNumberInput: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
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
})

export default PhoneNumberScreen
