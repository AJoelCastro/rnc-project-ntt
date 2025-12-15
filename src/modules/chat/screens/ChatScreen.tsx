import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ChatSession, Header } from '@arturocastro/react-native-rnc-library-ntt'

type Props = {}

const ChatScreen = ({}: Props) => {
  return (
    <View style={styles.container}>
        <Header title='Chatea con Robotin' iconName=''/>
        <ChatSession/>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1
    }
})

export default ChatScreen