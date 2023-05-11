import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button } from "react-native-paper"

const OTPScreen = ({ navigation }) => {
    const [otp, setOtp] = useState("")

    const verifyOTP = async () => {
        try {
            // Verify OTP via API
            console.log("OTP verified:", otp)
            navigation.navigate("Success")
        } catch (error) {
            console.error("OTP verification failed:", error)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                label='OTP'
                mode='outlined'
                keyboardType='number-pad'
                value={otp}
                onChangeText={setOtp}
            />
            <Button mode='contained' onPress={verifyOTP} style={styles.button}>
                Verify OTP
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    button: {
        marginTop: 16,
    },
})

export default OTPScreen
