import { useState, useEffect } from 'react';
import { NativeEventEmitter } from 'react-native';
import NativeNetworkMonitor from '../native/NativeNetworkMonitor';
import { ConnectionInfo } from '../types';

const eventEmitter = new NativeEventEmitter(NativeNetworkMonitor);

export const useNetworkMonitor = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial state
    NativeNetworkMonitor.getCurrentState()
      .then(setConnectionInfo)
      .finally(() => setIsLoading(false));

    // Subscribe to changes
    const subscription = eventEmitter.addListener(
      'networkStateChange',
      (info: ConnectionInfo) => setConnectionInfo(info)
    );

    return () => subscription.remove();
  }, []);

  return { connectionInfo, isLoading };
};