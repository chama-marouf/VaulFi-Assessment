import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type RootStackParamList = {
    Signup: undefined
    EmailOTP: {
        email: string
        password: string
    }
    PhoneNumber: {
        email: string
        password: string
    }
    OTPVerification: {
        email: string
        phoneNumber: string
        otpId: string
    }
    SignupSuccess: undefined
    Main: undefined
}

export type RootStackNavigationProp =
    NativeStackNavigationProp<RootStackParamList>
