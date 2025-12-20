import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import ChatScreen from '@/modules/chat/screens/ChatScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'

const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
    useNavigation: () => ({
        goBack: mockGoBack,
    }),
}))

jest.mock('@arturocastro/react-native-rnc-library-ntt', () => {
    const { View, Text, TouchableOpacity } = require('react-native')
    return {
        Header: (props: any) => (
            <View>
                <Text>{props.title}</Text>
                <TouchableOpacity
                    onPress={props.onBack}
                    testID="header-back"
                >
                    <Text>Back</Text>
                </TouchableOpacity>
            </View>
        ),
        ChatSession: () => <View testID="chat-session" />,
    }
})

jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
}))

describe('ChatScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('renders header and chat session', () => {
        const { getByText } = render(<ChatScreen />)

        expect(getByText('Chatea con Robotin')).toBeTruthy()
    })

    it('navigates back when header back is pressed', () => {
        const { getByTestId } = render(<ChatScreen />)

        fireEvent.press(getByTestId('header-back'))
        expect(mockGoBack).toHaveBeenCalled()
    })

    it('loads messages from cache on mount', async () => {
        const cachedMessages = [
            { id: '1', text: 'Hola', sender: 'user' },
            { id: '2', text: 'Respuesta del chatbox', sender: 'bot' },
        ]

            ; (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
                JSON.stringify(cachedMessages)
            )

        render(<ChatScreen />)

        await waitFor(() => {
            expect(AsyncStorage.getItem).toHaveBeenCalledWith(
                'chat_messages_cache'
            )
        })
    })

    it('saves messages to cache when messages change', async () => {
        ; (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null)

        render(<ChatScreen />)

        await waitFor(() => {
            expect(AsyncStorage.setItem).toHaveBeenCalledWith(
                'chat_messages_cache',
                JSON.stringify([])
            )
        })
    })
})
