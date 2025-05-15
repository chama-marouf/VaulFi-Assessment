import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import SignupScreen from "../screens/SignupScreen"
import EmailOTPScreen from "../screens/EmailOTPScreen"
import PhoneNumberScreen from "../screens/PhoneNumberScreen"
import PhoneOTPScreen from "../screens/PhoneOTPScreen"
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
                <Stack.Screen name='EmailOTP' component={EmailOTPScreen} />
                <Stack.Screen
                    name='PhoneNumber'
                    component={PhoneNumberScreen}
                />
                <Stack.Screen name='PhoneOTP' component={PhoneOTPScreen} />
                <Stack.Screen
                    name='SignupSuccess'
                    component={SignupSuccessScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator
