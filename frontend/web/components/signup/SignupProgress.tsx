"use client"

import React from "react"
import { Box, Typography } from "@mui/material"
import { SignupStep } from "@/types/auth"

interface SignupProgressProps {
    currentStep: SignupStep
}

const SignupProgress: React.FC<SignupProgressProps> = ({ currentStep }) => {
    const steps = [
        { step: SignupStep.EMAIL_PASSWORD, label: "Account" },
        { step: SignupStep.PHONE_NUMBER, label: "Phone" },
        { step: SignupStep.OTP_VERIFICATION, label: "Verify" },
        { step: SignupStep.SUCCESS, label: "Done" },
    ]

    const getStepIndex = (step: SignupStep) => {
        return steps.findIndex((s) => s.step === step)
    }

    const currentStepIndex = getStepIndex(currentStep)

    return (
        <Box sx={{ mb: 4 }}>
            <Box
                sx={{
                    position: "relative",
                    height: 4,
                    bgcolor: "#E0E0E0",
                    borderRadius: "2px",
                    mb: 2,
                    "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        height: "100%",
                        width: `${
                            ((currentStepIndex + 1) / steps.length) * 100
                        }%`,
                        bgcolor: "#0B045D",
                        borderRadius: "2px",
                        transition: "width 0.3s ease-in-out",
                    },
                }}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                {steps.map((step) => (
                    <Typography
                        key={step.step}
                        variant='caption'
                        sx={{
                            color:
                                getStepIndex(step.step) <= currentStepIndex
                                    ? "#0B045D"
                                    : "text.secondary",
                            fontWeight:
                                getStepIndex(step.step) === currentStepIndex
                                    ? 600
                                    : 400,
                            fontSize: "0.75rem",
                        }}>
                        {step.label}
                    </Typography>
                ))}
            </Box>
        </Box>
    )
}

export default SignupProgress
