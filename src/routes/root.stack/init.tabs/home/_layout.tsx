import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TransactionScreen from '@/modules/transaction/screens/TransactionScreen';
import WelcomeScreen from '@/modules/transaction/screens/WelcomeScreen';

const Stack = createNativeStackNavigator();

type Props = {}

const HomeLayout = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeHome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionHome"
        component={TransactionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeLayout