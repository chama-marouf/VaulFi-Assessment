import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Typography } from "@mui/material"
import FormField from "@/components/FormField"
import { SignupSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/router"

import { signup } from "../services/authService"

interface SignupFormInputs {
    email: string
    password: string
}

const Signup = () => {
    const router = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormInputs>({
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
        <Container maxWidth='sm' style={{ marginTop: "2rem" }}>
            <Typography variant='h4' align='center' gutterBottom>
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                        <FormField
                            {...field}
                            label='Email'
                            type='email'
                            errorText={errors.email?.message}
                        />
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <FormField
                            {...field}
                            label='Password'
                            type='password'
                            errorText={errors.password?.message}
                        />
                    )}
                />
                <Button type='submit' variant='contained' fullWidth>
                    Continue
                </Button>
            </form>
        </Container>
    )
}

export default Signup
