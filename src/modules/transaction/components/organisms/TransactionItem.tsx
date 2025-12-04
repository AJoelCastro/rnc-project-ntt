import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Transaction } from '@/shared/data/MockTransactions'; 

interface Props {
  item: Transaction;
}

export const TransactionItem = ({ item }: Props) => {
  const isIncome = item.type === 'income';

  const formattedAmount =
    (isIncome ? '+ S/ ' : '- S/ ') + item.amount.toFixed(2);

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.categoryChip}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </Text>
      </View>

      <Text
        style={[
          styles.amount,
          { color: isIncome ? '#11C76F' : '#FF4D4D' },
        ]}
      >
        {formattedAmount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    margin:12
  },
  leftSection: {
    flex: 1,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 11,
    color: '#666',
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    alignSelf: 'center',
  },
});
