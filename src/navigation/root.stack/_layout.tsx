import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitLayout from './init.tabs/_layout';
import AuthenticationLayout from './authentication/_layout';

const Stack = createNativeStackNavigator();

type Props = {}

const RootLayout = ({}: Props) => {
  return (
    <Stack.Navigator>
        <Stack.Screen
          name="Authentication"
          component={AuthenticationLayout}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="Init"
          component={InitLayout}
          options={{ headerShown: false }}
        />
    </Stack.Navigator>
  )
}

export default RootLayout