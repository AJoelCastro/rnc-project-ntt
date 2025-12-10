import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import HomeLayout from './home/_layout';
import ChatLayout from './chat/_layout';
import ConfigurationLayout from './configuration/_layout';

const Tab = createBottomTabNavigator();

type Props = {}

const InitLayout = (props: Props) => {
  return (
    <Tab.Navigator>
        <Tab.Screen
            name='InitHome'
            component={HomeLayout}
            options={{
              title: 'Inicio',
              headerShown: false,
              tabBarIcon: () => <Text>🏠</Text>,
            }}
            
        />
        <Tab.Screen
            name='Chat'
            component={ChatLayout}
            options={{
              headerShown: false,
              tabBarIcon: () => <Text>💬</Text>,
            }}
        />
        <Tab.Screen
            name='Configuracion'
            component={ConfigurationLayout}
            options={{
              headerShown: false,
              tabBarIcon: () => <Text>⚙️</Text>,
            }}
        />
    </Tab.Navigator>
  )
}

export default InitLayout