"use client"

import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    Button,
    Container,
    Typography,
    Box,
    Paper,
    Alert,
    Link,
} from "@mui/material"
import FormField from "@/components/FormField"
import { SignupSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/router"
import { authService } from "../services/auth"
import SignupProgress from "@/components/signup/SignupProgress"
import { SignupStep } from "@/types/auth"
import HelpButton from "@/components/HelpButton"

interface SignupFormInputs {
    email: string
    password: string
    confirmPassword: string
}

const Signup = () => {
    const router = useRouter()
    const [error, setError] = React.useState<string | null>(null)
    const [currentStep, setCurrentStep] = React.useState<SignupStep>(
        SignupStep.EMAIL_PASSWORD
    )
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormInputs>({
        resolver: yupResolver(SignupSchema),
    })

    const onSubmit = async (data: SignupFormInputs) => {
        try {
            setError(null)
            await authService.signup()
            console.log("Signup successful")
            setCurrentStep(SignupStep.PHONE_NUMBER)
            router.push("/phone-number")
        } catch (err) {
            const error = err as Error
            setError(error.message || "An error occurred during signup")
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                bgcolor: "#F5F5F5",
                position: "relative",
                fontFamily: "Inter, sans-serif",
            }}>
            <HelpButton />
            <Container
                maxWidth='sm'
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    py: 4,
                }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        bgcolor: "white",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Typography
                        variant='h4'
                        align='center'
                        gutterBottom
                        sx={{
                            mb: 2,
                            fontWeight: 600,
                            fontFamily: "Inter, sans-serif",
                            fontColor: "#0B045D",
                        }}>
                        Sign Up
                    </Typography>
                    <SignupProgress currentStep={currentStep} />
                    {error && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}>
                        <Box sx={{ flex: 1 }}>
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
                            <Controller
                                name='confirmPassword'
                                control={control}
                                render={({ field }) => (
                                    <FormField
                                        {...field}
                                        label='Confirm Password'
                                        type='password'
                                        errorText={
                                            errors.confirmPassword?.message
                                        }
                                    />
                                )}
                            />
                        </Box>
                        <Button
                            type='submit'
                            variant='contained'
                            fullWidth
                            disabled={isSubmitting}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                borderRadius: "60px",
                                textTransform: "none",
                                fontSize: "1rem",
                                fontWeight: 600,
                                bgcolor: "#0B045D",
                                fontFamily: "Inter, sans-serif",
                                "&:hover": {
                                    bgcolor: "#0B045D",
                                    opacity: 0.9,
                                },
                            }}>
                            {isSubmitting ? "Signing up..." : "Sign Up"}
                        </Button>
                        <Box sx={{ mt: 2, textAlign: "center" }}>
                            <Typography
                                variant='body2'
                                component='span'
                                color='text.secondary'
                                sx={{ fontFamily: "Inter, sans-serif" }}>
                                Already have an account?{" "}
                            </Typography>
                            <Link
                                href='/signin'
                                sx={{
                                    color: "#0B045D",
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    fontFamily: "Inter, sans-serif",
                                    "&:hover": {
                                        textDecoration: "underline",
                                    },
                                }}>
                                Sign in
                            </Link>
                        </Box>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}

export default Signup
