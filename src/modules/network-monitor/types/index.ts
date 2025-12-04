export type ConnectionInfo = {
  type: 'wifi' | 'cellular' | 'none' | 'unknown';
  isConnected: boolean;
  isInternetReachable: boolean;
};