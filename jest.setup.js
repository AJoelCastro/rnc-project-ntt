
jest.mock('@arturocastro/react-native-rnc-library-ntt', () => ({
    Header: 'Header',
    TransactionsList: 'TransactionsList',
    ChatSession: 'ChatSession',
    ConfigItem: 'ConfigItem',
    Card: 'Card',
    InputEmail: 'InputEmail',
    InputPassword: 'InputPassword',
    InputWithDelete: 'InputWithDelete',
    Selector: 'Selector',
    Button: 'Button',
    ServiceItem: 'ServiceItem',
    SecureStorage: {
        setItem: jest.fn(),
        getItem: jest.fn(),
        removeItem: jest.fn(),
    },
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
