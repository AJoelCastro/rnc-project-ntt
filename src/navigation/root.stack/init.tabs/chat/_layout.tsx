import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

type Props = {}

const ChatLayout = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeChat"
        component={() => <Text>Chat Screen</Text>}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailsChat"
        component={() => <Text>Chat Details Screen</Text>}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ChatLayout