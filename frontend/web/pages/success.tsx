import React from "react"
import { Container, Typography, Box, Paper } from "@mui/material"
import SignupProgress from "@/components/signup/SignupProgress"
import { SignupStep } from "@/types/auth"
import HelpButton from "@/components/HelpButton"

const Success = () => (
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
                    alignItems: "center",
                    justifyContent: "center",
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
                    Signup Successful!
                </Typography>
                <SignupProgress currentStep={SignupStep.SUCCESS} />
                <Typography
                    variant='subtitle1'
                    align='center'
                    sx={{
                        mt: 2,
                        color: "text.secondary",
                        fontFamily: "Inter, sans-serif",
                    }}>
                    Your account has been created successfully. You can now log
                    in to your account.
                </Typography>
            </Paper>
        </Container>
    </Box>
)

export default Success
