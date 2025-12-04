import React from 'react';
import { FlatList, View } from 'react-native';
import { MOCK_TRANSACTIONS } from '@/shared/data/MockTransactions';
import { TransactionItem } from './TransactionItem';
import { TransactionsHeader } from './TransactionsHeader';

export const TransactionsList = () => {
  return (
    <View >
      <FlatList
        data={MOCK_TRANSACTIONS.slice(0, 10)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem item={item} />}
        ListHeaderComponent={
          <TransactionsHeader transactions={MOCK_TRANSACTIONS} />
        }
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
