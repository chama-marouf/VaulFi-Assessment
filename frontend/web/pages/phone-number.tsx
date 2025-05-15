import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Typography, Box, Paper, Alert } from "@mui/material"
import FormField from "@/components/FormField"
import { PhoneSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/router"
import SignupProgress from "@/components/signup/SignupProgress"
import { SignupStep } from "@/types/auth"
import HelpButton from "@/components/HelpButton"
import { authService } from "@/services/auth"

interface PhoneFormInputs {
    phoneNumber: string
}

const PhoneNumber = () => {
    const router = useRouter()
    const [error, setError] = React.useState<string | null>(null)
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PhoneFormInputs>({
        resolver: yupResolver(PhoneSchema),
    })

    const onSubmit = async (data: PhoneFormInputs) => {
        try {
            setError(null)
            console.log("Submitting phone number:", data.phoneNumber)
            const response = await authService.verifyPhone(data.phoneNumber)
            console.log("Phone verification response:", response)

            if (response.status === "success" && response.data?.otpId) {
                // Store OTP ID in localStorage for the next step
                localStorage.setItem("otpId", response.data.otpId)
                router.push("/otp")
            } else {
                const errorMessage =
                    response.message ||
                    "Unknown error occurred during phone verification"
                console.error("Phone verification failed:", errorMessage)
                setError(errorMessage)
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            console.error("Phone number submission failed:", error)
            setError(errorMessage)
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
                        Add your Number
                    </Typography>
                    <SignupProgress currentStep={SignupStep.PHONE_NUMBER} />
                    {error && (
                        <Alert severity='error' sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Typography
                        variant='subtitle1'
                        align='center'
                        gutterBottom
                        sx={{
                            mb: 3,
                            color: "text.secondary",
                            fontFamily: "Inter, sans-serif",
                        }}>
                        Please add your phone number. We will send you a
                        verification code to confirm it.
                    </Typography>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}>
                        <Box sx={{ flex: 1 }}>
                            <Controller
                                name='phoneNumber'
                                control={control}
                                render={({ field }) => (
                                    <FormField
                                        {...field}
                                        label='Phone Number'
                                        type='tel'
                                        errorText={errors.phoneNumber?.message}
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
                            {isSubmitting ? "Submitting..." : "Next"}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}

export default PhoneNumber
