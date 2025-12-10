import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import HomeLayout from './home/_layout';

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
            component={()=><View></View>}
            options={{
              headerShown: false,
              tabBarIcon: () => <Text>💬</Text>,
            }}
        />
        <Tab.Screen
            name='Configuracion'
            component={()=><View></View>}
            options={{
              headerShown: false,
              tabBarIcon: () => <Text>⚙️</Text>,
            }}
        />
    </Tab.Navigator>
  )
}

export default InitLayout