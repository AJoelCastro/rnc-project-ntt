import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChatScreen from '@/modules/chat/screens/ChatScreen';

const Stack = createNativeStackNavigator();

type Props = {}

const ChatLayout = ({}: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeChat"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ChatLayout