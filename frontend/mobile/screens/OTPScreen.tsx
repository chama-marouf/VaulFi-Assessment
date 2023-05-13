// OTPScreen.tsx
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

// Helper Components
const BackButton = ({ navigation }) => (
    <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
)

const OTPInput = () => {
    const [otp, setOtp] = useState("")

    return (
        <View style={styles.otpContainer}>
            <View style={styles.otpInputBox}>
                <Text style={styles.otpText}>{otp.charAt(0) || ""}</Text>
            </View>
            <Text style={styles.otpSeparator}>|</Text>
            <View style={styles.otpInputBox}>
                <Text style={styles.otpText}>{otp.charAt(1) || ""}</Text>
            </View>
            <View style={styles.otpInputBox}>
                <Text style={styles.otpText}>{otp.charAt(2) || ""}</Text>
            </View>
            <View style={styles.otpInputBox}>
                <Text style={styles.otpText}>{otp.charAt(3) || ""}</Text>
            </View>

            <TextInput
                style={styles.hiddenInput}
                value={otp}
                onChangeText={(text) =>
                    setOtp(text.replace(/[^0-9]/g, "").slice(0, 4))
                }
                keyboardType='number-pad'
                maxLength={4}
                autoFocus
            />
        </View>
    )
}

const OTPScreen = () => {
    const navigation = useNavigation()

    const isEmailOTP = true

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <BackButton navigation={navigation} />
                <Text style={styles.headerTitle}>Sign Up</Text>
                <HelpButton />
            </View>

            <ProgressBar currentStep={isEmailOTP ? 2 : 4} totalSteps={4} />
            <Text style={styles.stepIndicator}>
                {isEmailOTP ? "2 of 4" : "4 of 4"}
            </Text>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    {isEmailOTP
                        ? "Email OTP Verification"
                        : "Phone OTP Verification"}
                </Text>
                <Text style={styles.subtitle}>
                    {isEmailOTP
                        ? "Please enter the code we sent to m*****02@gmail.com"
                        : "You're almost there! Please enter the code we sent to +213 560 ** ** *3"}
                </Text>

                <OTPInput />

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => {
                        if (isEmailOTP) {
                            navigation.navigate("PhoneNumber")
                        } else {
                            navigation.navigate("Success")
                        }
                    }}>
                    <Text style={styles.primaryButtonText}>Confirm</Text>
                </TouchableOpacity>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        Didn't receive the code?{" "}
                    </Text>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}>Resend OTP</Text>
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
    backButton: {
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    backButtonText: {
        fontSize: 22,
        color: "#000080",
    },
    helpButton: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    helpButtonText: {
        fontSize: 16,
        color: "#000",
    },
    progressBarContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    progressBarSegment: {
        flex: 1,
        height: 4,
        marginRight: 4,
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
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        position: "relative",
    },
    otpInputBox: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
    },
    otpText: {
        fontSize: 24,
        fontWeight: "600",
    },
    otpSeparator: {
        fontSize: 24,
        color: "#E0E0E0",
        marginHorizontal: 5,
    },
    hiddenInput: {
        position: "absolute",
        opacity: 0,
        height: 50,
        width: "100%",
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

export default OTPScreen
