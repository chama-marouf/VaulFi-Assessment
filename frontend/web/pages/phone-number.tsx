import React from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Container, Typography } from "@mui/material"
import FormField from "@/components/FormField"
import { PhoneSchema } from "@/utils/validationSchemas"
import { useRouter } from "next/router"

interface PhoneFormInputs {
    phoneNumber: string
}

const PhoneNumber = () => {
    const router = useRouter()
    const {
        control,
        handleSubmit,
        formState: { errors },
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
        <Container maxWidth='sm' style={{ marginTop: "2rem" }}>
            <Typography variant='h4' align='center' gutterBottom>
                Phone Number
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button type='submit' variant='contained' fullWidth>
                    Send OTP
                </Button>
            </form>
        </Container>
    )
}

export default PhoneNumber
