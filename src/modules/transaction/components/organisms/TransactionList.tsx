import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { MOCK_TRANSACTIONS } from '@/shared/data/MockTransactions';
import { TransactionItem } from './TransactionItem';
import { TransactionsHeader } from './TransactionHeader';

export const TransactionsList = () => {
  return (
    <View style={styles.container}>
      <TransactionsHeader transactions={MOCK_TRANSACTIONS} />
      <FlatList
        data={MOCK_TRANSACTIONS.slice(0, 10)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
