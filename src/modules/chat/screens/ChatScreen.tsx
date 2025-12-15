import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ChatSession, Header } from '@arturocastro/react-native-rnc-library-ntt'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const ChatScreen = ({}: Props) => {

    const navigate = useNavigation();

  return (
    <View style={styles.container}>
        <Header title='Chatea con Robotin' iconName='' onBack={()=> navigate.goBack()}/>
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