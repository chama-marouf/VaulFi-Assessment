import React from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { useForm, Controller } from "react-hook-form"

const PhoneNumberScreen = ({ navigation }) => {
    const { control, handleSubmit } = useForm()

    const onSubmit = async (data) => {
        try {
            // Send phone number to backend
            console.log("Phone number submitted:", data)
            navigation.navigate("OTP")
        } catch (error) {
            console.error("Phone number submission failed:", error)
        }
    }

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name='phoneNumber'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label='Phone Number'
                        mode='outlined'
                        keyboardType='phone-pad'
                        value={value}
                        onChangeText={onChange}
                    />
                )}
            />
            <Button
                mode='contained'
                onPress={handleSubmit(onSubmit)}
                style={styles.button}>
                Send OTP
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

export default PhoneNumberScreen
