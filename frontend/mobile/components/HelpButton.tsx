import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React from "react"

export default function HelpButton() {
    return (
        <TouchableOpacity style={styles.helpButton}>
            <Text style={styles.helpButtonText}>?</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})
