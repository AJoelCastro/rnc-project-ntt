import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ConnectionBadge } from '../atoms/ConnectionBadge';
import { ConnectionInfo } from '../../types';

interface Props {
  connectionInfo: ConnectionInfo;
}

export const NetworkStatusCard: React.FC<Props> = ({ connectionInfo }) => (
  <View style={styles.card}>
    <Text style={styles.title}>Estado de Conexión</Text>
    <ConnectionBadge
      type={connectionInfo.type}
      isConnected={connectionInfo.isConnected}
    />
    <Text style={styles.detail}>
      Internet: {connectionInfo.isInternetReachable ? '✓' : '✗'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
});