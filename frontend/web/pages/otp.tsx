import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Typography, Box, Paper, Alert } from "@mui/material"
import FormField from "@/components/FormField"
import { OTPSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/router"
import SignupProgress from "@/components/signup/SignupProgress"
import { SignupStep } from "@/types/auth"
import HelpButton from "@/components/HelpButton"
import { authService } from "@/services/auth"

interface OTPFormInputs {
    otp: string
}

const OTP = () => {
    const router = useRouter()
    const [error, setError] = React.useState<string | null>(null)
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<OTPFormInputs>({
        resolver: yupResolver(OTPSchema),
    })

    const onSubmit = async (data: OTPFormInputs) => {
        try {
            setError(null)
            const otpId = localStorage.getItem("otpId")
            if (!otpId) {
                throw new Error("OTP session expired. Please try again.")
            }

            console.log("Verifying OTP:", { otpId, code: data.otp })
            const response = await authService.verifyOTP(otpId, data.otp)
            console.log("OTP verification response:", response)

            if (response.status === "success" && response.data?.verified) {
                // Store the auth token if provided
                if (response.data.token) {
                    localStorage.setItem("authToken", response.data.token)
                }
                router.push("/success")
            } else {
                const errorMessage =
                    response.message || "OTP verification failed"
                console.error("OTP verification failed:", errorMessage)
                setError(errorMessage)
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            console.error("OTP verification failed:", error)
            setError(errorMessage)
        }
    }

    const handleResendOTP = async () => {
        try {
            setError(null)
            const otpId = localStorage.getItem("otpId")
            if (!otpId) {
                throw new Error("OTP session expired. Please try again.")
            }

            const response = await authService.resendOTP(otpId)

            if (response.status === "success" && response.data) {
                localStorage.setItem("otpId", response.data.otpId)
                // Show success message to user
            } else {
                const errorMessage = response.message || "Failed to resend OTP"
                console.error("Failed to resend OTP:", errorMessage)
                setError(errorMessage)
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            console.error("Failed to resend OTP:", error)
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
                        Verify OTP
                    </Typography>
                    <SignupProgress currentStep={SignupStep.OTP_VERIFICATION} />
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
                        Please enter the verification code sent to your phone
                        number.
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
                                name='otp'
                                control={control}
                                render={({ field }) => (
                                    <FormField
                                        {...field}
                                        label='4-Digit OTP'
                                        type='text'
                                        placeholder='Enter 4-digit code'
                                        inputProps={{ maxLength: 4 }}
                                        errorText={errors.otp?.message}
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
                            {isSubmitting ? "Verifying..." : "Verify"}
                        </Button>
                        <Button
                            onClick={handleResendOTP}
                            variant='text'
                            fullWidth
                            sx={{
                                mt: 1,
                                textTransform: "none",
                                fontSize: "0.875rem",
                                color: "text.secondary",
                                fontFamily: "Inter, sans-serif",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}>
                            Didn't receive the code? Resend
                        </Button>
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}

export default OTP
