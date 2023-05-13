import { View, StyleSheet } from "react-native"
import React from "react"

interface ProgressBarProps {
    totalSteps: number
    currentStep: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    totalSteps,
    currentStep,
}) => {
    return (
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
}

const styles = StyleSheet.create({
    progressBarContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    progressBarSegment: {
        flex: 1,
        height: 4,
        marginRight: 4,
    },
})

export default ProgressBar
