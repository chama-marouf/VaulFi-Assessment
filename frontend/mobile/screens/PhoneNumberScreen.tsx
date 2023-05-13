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

// Helper Components
const BackButton = ({ navigation }) => (
    <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
    </TouchableOpacity>
)

const HelpButton = () => (
    <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpButtonText}>?</Text>
    </TouchableOpacity>
)

const ProgressBar = ({ currentStep, totalSteps }) => (
    <View style={styles.progressBarContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => (
            <View
                key={index}
                style={[
                    styles.progressBarSegment,
                    {
                        backgroundColor:
                            index < currentStep ? "#000080" : "#E0E0E0",
                    },
                ]}
            />
        ))}
    </View>
)

const PhoneNumberScreen = () => {
    const navigation = useNavigation()
    const [countryCode, setCountryCode] = useState("+213")
    const [phoneNumber, setPhoneNumber] = useState("")

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <BackButton navigation={navigation} />
                <Text style={styles.headerTitle}>Sign Up</Text>
                <HelpButton />
            </View>

            <ProgressBar currentStep={3} totalSteps={4} />
            <Text style={styles.stepIndicator}>3 of 4</Text>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Add your Number</Text>
                <Text style={styles.subtitle}>
                    Please add your phone number. We will send you a
                    verification code to confirm it.
                </Text>

                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.phoneInputContainer}>
                    <View style={styles.countryCodeContainer}>
                        <Text style={styles.countryCodeText}>
                            {countryCode}
                        </Text>
                    </View>
                    <TextInput
                        style={styles.phoneInput}
                        placeholder='560 01 76 52'
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType='phone-pad'
                    />
                </View>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() =>
                        navigation.navigate("OTP", { isEmailOTP: false })
                    }>
                    <Text style={styles.primaryButtonText}>Next</Text>
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
    inputLabel: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    phoneInputContainer: {
        flexDirection: "row",
        marginBottom: 15,
    },
    countryCodeContainer: {
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 15,
        justifyContent: "center",
        marginRight: 10,
    },
    countryCodeText: {
        fontSize: 16,
    },
    phoneInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 8,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
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
})

export default PhoneNumberScreen
