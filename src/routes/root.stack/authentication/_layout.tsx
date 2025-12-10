import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
type Props = {}

const AuthenticationLayout = (props: Props) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={require('../../../modules/authentication/screens/LoginScreen').default}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={require('../../../modules/authentication/screens/RegisterScreen').default}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  )
}

export default AuthenticationLayout