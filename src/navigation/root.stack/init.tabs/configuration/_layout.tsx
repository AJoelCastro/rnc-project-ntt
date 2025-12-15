import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConfigurationScreen from '@/modules/configuration/screens/ConfigurationScreen';

const Stack = createNativeStackNavigator();

type Props = {}

const ConfigurationLayout = ({}: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeConfiguration"
        component={ConfigurationScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ConfigurationLayout