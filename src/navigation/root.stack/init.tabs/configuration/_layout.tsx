import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

type Props = {}

const ConfigurationLayout = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeConfiguration"
        component={() => <Text>Configuration Screen</Text>}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsConfiguration"
        component={() => <Text>Configuration Details Screen</Text>}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ConfigurationLayout