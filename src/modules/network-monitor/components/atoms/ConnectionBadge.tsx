import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  type: 'wifi' | 'cellular' | 'none' | 'unknown';
  isConnected: boolean;
}

export const ConnectionBadge: React.FC<Props> = ({ type, isConnected }) => {
  const color = isConnected ? 'green' : 'red';
  const icon = type === 'wifi' ? '📶' : type === 'cellular' ? '📱' : '❌';

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text>{icon}</Text>
      <Text style={styles.text}>{type.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});