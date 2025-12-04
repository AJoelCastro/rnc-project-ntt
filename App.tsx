/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import TransactionPage from '@/modules/transaction/pages';
import { useTheme } from '@/shared/hooks/useTheme'
import { NetworkStatusCard } from '@/modules/network-monitor/components/molecules/NetworkStatusCard';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();
  const {colors} = useTheme()

  return (
    <View 
      style={
        [
          styles.container,
          {
            paddingTop: safeAreaInsets!.top,
            paddingLeft: safeAreaInsets!.left,
            paddingRight: safeAreaInsets!.right,
            paddingBottom: safeAreaInsets!.bottom,
            backgroundColor: colors.background,

          }
        ]
      }
    >
      {/* <NetworkStatusCard connectionInfo={{type:"wifi", isConnected:true, isInternetReachable:true}}/> */}
      <TransactionPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
