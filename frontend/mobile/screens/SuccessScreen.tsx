// SuccessScreen.tsx
import React from "react"
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
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

const SuccessScreen = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <BackButton navigation={navigation} />
                <Text style={styles.headerTitle}>Sign Up</Text>
                <HelpButton />
            </View>

            <View style={[styles.contentContainer, styles.successContainer]}>
                <View style={styles.successIconContainer}>
                    <Text style={styles.successIcon}>✓</Text>
                </View>

                <Text style={styles.welcomeTitle}>
                    Welcome to <Text style={styles.brandText}>VaultFi</Text>
                </Text>
                <Text style={styles.successMessage}>
                    Your account was created successfully
                </Text>

                <TouchableOpacity
                    style={[styles.primaryButton, styles.homeButton]}
                    onPress={() => {
                        // Navigate to home screen
                        // This would normally go to your app's main screen
                        console.log("Navigate to home screen")
                    }}>
                    <Text style={styles.primaryButtonText}>
                        Go to home page
                    </Text>
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
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    successContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    successIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    successIcon: {
        color: "#fff",
        fontSize: 40,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000080",
        marginBottom: 8,
    },
    brandText: {
        fontWeight: "bold",
    },
    successMessage: {
        fontSize: 14,
        color: "#666",
        marginBottom: 50,
        textAlign: "center",
    },
    primaryButton: {
        backgroundColor: "#000080",
        borderRadius: 8,
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
    homeButton: {
        marginTop: 50,
    },
})

export default SuccessScreen
