import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignupScreen from "../screens/SignupScreen"
import PhoneNumberScreen from "../screens/PhoneNumberScreen"
import OTPScreen from "../screens/OTPScreen"
import SuccessScreen from "../screens/SuccessScreen"

const Stack = createNativeStackNavigator()

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Signup'>
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='PhoneNumber' component={PhoneNumberScreen} />
            <Stack.Screen name='OTP' component={OTPScreen} />
            <Stack.Screen name='Success' component={SuccessScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export default AppNavigator
