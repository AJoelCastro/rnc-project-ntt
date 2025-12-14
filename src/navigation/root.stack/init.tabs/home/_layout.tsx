import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TransactionScreen from '@/modules/transaction/screens/TransactionScreen';
import WelcomeScreen from '@/modules/transaction/screens/WelcomeScreen';
import LeanScreen from '@/modules/transaction/screens/LeanScreen';
import CardScreen from '@/modules/transaction/screens/CardScreen';

const Stack = createNativeStackNavigator();

type Props = {}

const HomeLayout = ({}: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeHome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardHome"
        component={CardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionHome"
        component={TransactionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='LeanHome'
        component={LeanScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeLayout