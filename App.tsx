/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { useTheme } from '@/modules/shared/hooks/useTheme'
import { NavigationContainer } from '@react-navigation/native';
import RootLayout from '@/navigation/root.stack/_layout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoadingStore } from '@/store/LoadingStore';

const linking = {
  prefixes: ['example://'],
  config: {
    screens: {
      Authentication: 'auth',

      Init: {
        screens: {
          Configuracion: {
            screens: {
              WelcomeConfiguration: 'configuracion',
            },
          },
        },
      },
    },
  },
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { isLoading } = useLoadingStore()
  return (

    <NavigationContainer linking={linking}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
      {
        isLoading && (
          <View style={styles.loading}>
            <Text>
              loading
            </Text>
          </View>
        )
      }

    </NavigationContainer>

  );
}

function AppContent() {
  const { colors } = useTheme()

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
      <RootLayout />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }
});

export default App;
