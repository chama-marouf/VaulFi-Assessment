import React from "react"
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import HelpButton from "../components/HelpButton"
import ProgressBar from "../components/ProgressBar"
import { RootStackNavigationProp } from "../types/navigation"

const SignupSuccessScreen = () => {
    const navigation = useNavigation<RootStackNavigationProp>()

    const handleContinue = () => {
        // Navigate to the main app
        navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: 30 }} />
                <Text style={styles.headerTitle}>Success</Text>
                <HelpButton />
            </View>

            <ProgressBar currentStep={4} totalSteps={4} />
            <Text style={styles.stepIndicator}>4 of 4</Text>

            <View style={styles.contentContainer}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name='checkmark-circle'
                        size={80}
                        color='#4CAF50'
                    />
                </View>

                <Text style={styles.title}>Account Created!</Text>
                <Text style={styles.subtitle}>
                    Your account has been successfully created. You can now
                    start using the app.
                </Text>

                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleContinue}>
                    <Text style={styles.primaryButtonText}>Continue</Text>
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
        alignItems: "center",
    },
    iconContainer: {
        marginTop: 40,
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000080",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 20,
        textAlign: "center",
    },
    primaryButton: {
        backgroundColor: "#000080",
        borderRadius: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
})

export default SignupSuccessScreen
