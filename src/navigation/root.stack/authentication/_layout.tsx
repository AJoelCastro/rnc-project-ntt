import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@/modules/shared/screens/SplashScreen';
const Stack = createNativeStackNavigator();
type Props = {}

const AuthenticationLayout = ({}: Props) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          options={{ headerShown: false }}
        >
          {(props) => <SplashScreen {...props} isInitializing={true} />}
        </Stack.Screen>
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