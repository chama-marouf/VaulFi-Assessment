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
    PhoneOTP: {
        email: string
        phoneNumber: string
        countryCode: string
    }
    SignupSuccess: undefined
    Main: undefined
}

export type RootStackNavigationProp =
    NativeStackNavigationProp<RootStackParamList>
