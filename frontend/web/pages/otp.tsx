import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Typography } from "@mui/material"
import FormField from "@/components/FormField"
import { OTPSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/router"

interface OTPFormInputs {
    otp: string
}

const OTP = () => {
    const router = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors },
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
        <Container maxWidth='sm' style={{ marginTop: "2rem" }}>
            <Typography variant='h4' align='center' gutterBottom>
                Verify OTP
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button type='submit' variant='contained' fullWidth>
                    Verify
                </Button>
            </form>
        </Container>
    )
}

export default OTP
