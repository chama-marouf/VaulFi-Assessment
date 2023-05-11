import React from "react"
import { View, StyleSheet } from "react-native"
import { TextInput, Button, Text } from "react-native-paper"
import { useForm, Controller } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { signup } from "../services/authService"

const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
})

const SignupScreen = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SignupSchema),
    })

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            const response = await signup(data.email, data.password)
            console.log("Signup successful:", response.data)
        } catch (error: any) {
            console.error(
                "Signup failed:",
                error.response?.data || error.message
            )
        }
    }

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                name='email'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label='Email'
                        mode='outlined'
                        value={value}
                        onChangeText={onChange}
                        error={!!errors.email}
                    />
                )}
            />
            {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
            )}

            <Controller
                control={control}
                name='password'
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        label='Password'
                        mode='outlined'
                        secureTextEntry
                        value={value}
                        onChangeText={onChange}
                        error={!!errors.password}
                    />
                )}
            />
            {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
            )}

            <Button
                mode='contained'
                onPress={handleSubmit(onSubmit)}
                style={styles.button}>
                Continue
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
    errorText: {
        color: "red",
        fontSize: 12,
    },
    button: {
        marginTop: 16,
    },
})

export default SignupScreen
