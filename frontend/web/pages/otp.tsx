import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Typography, Box, Paper } from "@mui/material"
import FormField from "@/components/FormField"
import { OTPSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/router"
import SignupProgress from "@/components/signup/SignupProgress"
import { SignupStep } from "@/types/auth"
import HelpButton from "@/components/HelpButton"

interface OTPFormInputs {
    otp: string
}

const OTP = () => {
    const router = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<OTPFormInputs>({
        resolver: yupResolver(OTPSchema),
    })

    const onSubmit = async (data: OTPFormInputs) => {
        try {
            console.log("OTP verified:", data)
            router.push("/success")
        } catch (error) {
            console.error("OTP verification failed:", error)
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
                                        label='OTP'
                                        type='text'
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
                    </form>
                </Paper>
            </Container>
        </Box>
    )
}

export default OTP
