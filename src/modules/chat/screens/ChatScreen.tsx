import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChatSession, Header } from '@arturocastro/react-native-rnc-library-ntt'
import { useNavigation } from '@react-navigation/native'
import { Message } from 'node_modules/@arturocastro/react-native-rnc-library-ntt/lib/typescript/src/modules/chat/types'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}
const CHAT_CACHE_KEY = 'chat_messages_cache'

const ChatScreen = ({ }: Props) => {

  const navigate = useNavigation();
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    console.log('Mensajes actuales:', messages)
  }, [messages])

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const cachedMessages = await AsyncStorage.getItem(CHAT_CACHE_KEY)
        if (cachedMessages) {
          setMessages(JSON.parse(cachedMessages))
        }
      } catch (error) {
        console.error('Error al cargar mensajes:', error)
      }
    }
    loadMessages()
  }, [])

  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem(CHAT_CACHE_KEY, JSON.stringify(messages))
      } catch (error) {
        console.error('Error al guardar mensajes:', error)
      }
    }
    saveMessages()
  }, [messages])

  return (
    <View style={styles.container}>
      <Header title='Chatea con Robotin' iconName='' onBack={() => navigate.goBack()} />
      <ChatSession
        messages={messages}
        setMessages={setMessages}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ChatScreen