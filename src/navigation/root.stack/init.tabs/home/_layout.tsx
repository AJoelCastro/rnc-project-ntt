import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TransactionScreen from '@/modules/transaction/screens/TransactionScreen';
import WelcomeScreen from '@/modules/transaction/screens/WelcomeScreen';
import LeanScreen from '@/modules/transaction/screens/LeanScreen';
import CardScreen from '@/modules/transaction/screens/CardScreen';
import ServicesScreen from '@/modules/transaction/screens/ServicesScreen';
import ServiceDetailScreen from '@/modules/transaction/screens/services/ServiceDetailScreen';

export type HomeStackParamList = {
  WelcomeHome: undefined
  CardHome: undefined
  TransactionHome: undefined
  LeanHome: undefined
  ServicesHome: undefined
  ServiceDetailHome: { id: number } // 👈 ruta con parámetro
}


const Stack = createNativeStackNavigator<HomeStackParamList>();

type Props = {}

const HomeLayout = ({ }: Props) => {
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
      <Stack.Screen
        name='ServicesHome'
        component={ServicesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceDetailHome"
        component={ServiceDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeLayout