/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';

import { useTheme } from '@/shared/hooks/useTheme'
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from '@/routes/root.stack/_layout';
import { SafeAreaView } from 'react-native-safe-area-context';

const linking = {
  prefixes: ['example://'],
  config: {
    screens: {
      LoginScreen: 'login',
    },
  },
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (

    <NavigationContainer linking={linking}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
    </NavigationContainer>

  );
}

function AppContent() {
  const {colors} = useTheme()
  
  return (

    <SafeAreaView 
      style={
        [
          styles.container,
          {
            
            backgroundColor: colors.background,

          }
        ]
      }
    >
      <RootLayout/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
