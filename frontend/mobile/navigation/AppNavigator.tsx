import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignupScreen from "../screens/SignupScreen"
import PhoneNumberScreen from "../screens/PhoneNumberScreen"
import OTPVerificationScreen from "../screens/OTPVerificationScreen"
import SignupSuccessScreen from "../screens/SignupSuccessScreen"
import { RootStackParamList } from "../types/navigation"

const Stack = createNativeStackNavigator<RootStackParamList>()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Signup'
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name='Signup' component={SignupScreen} />
                <Stack.Screen
                    name='PhoneNumber'
                    component={PhoneNumberScreen}
                />
                <Stack.Screen
                    name='OTPVerification'
                    component={OTPVerificationScreen}
                />
                <Stack.Screen
                    name='SignupSuccess'
                    component={SignupSuccessScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
