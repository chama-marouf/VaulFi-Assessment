import React from "react"
import { View, Text, StyleSheet } from "react-native"

const SuccessScreen = () => (
    <View style={styles.container}>
        <Text style={styles.successText}>Signup Successful!</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    successText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
    },
})

export default SuccessScreen
