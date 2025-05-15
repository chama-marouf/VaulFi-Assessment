import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Typography, Box, Paper } from "@mui/material"
import FormField from "@/components/FormField"
import { PhoneSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/router"
import SignupProgress from "@/components/signup/SignupProgress"
import { SignupStep } from "@/types/auth"
import HelpButton from "@/components/HelpButton"

interface PhoneFormInputs {
    phoneNumber: string
}

const PhoneNumber = () => {
    const router = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PhoneFormInputs>({
        resolver: yupResolver(PhoneSchema),
    })

    const onSubmit = async (data: PhoneFormInputs) => {
        try {
            console.log("Phone number submitted:", data)
            router.push("/otp")
        } catch (error) {
            console.error("Phone number submission failed:", error)
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
