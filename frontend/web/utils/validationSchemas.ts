import * as Yup from "yup"

export const SignupSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
})

export const PhoneSchema = Yup.object({
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
})

export const OTPSchema = Yup.object({
    otp: Yup.string()
        .length(6, "OTP must be 6 digits")
        .required("OTP is required"),
})
