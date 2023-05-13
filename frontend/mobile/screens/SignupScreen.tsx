import React, { useState } from "react"
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import HelpButton from "../components/HelpButton"
import ProgressBar from "../components/ProgressBar"

const SignupScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='example@gmail.com'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </View>

                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='••••••••••••••'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.showHideText}>👁️</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputLabel}>Confirm password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='••••••••••••••'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                        }>
                        <Text style={styles.showHideText}>👁️</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate("OTP")}>
                    <Text style={styles.primaryButtonText}>Sign up</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Already have an account?{" "}
                    </Text>
                    <TouchableOpacity>
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
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 15,
        alignItems: "center",
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    showHideText: {
        fontSize: 16,
        color: "#666",
    },
    primaryButton: {
        backgroundColor: "#000080",
        borderRadius: 8,
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
})

export default SignupScreen
