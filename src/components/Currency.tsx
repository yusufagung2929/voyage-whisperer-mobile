
import React from 'react';
import { Text } from 'react-native';

interface CurrencyProps {
  amount: number;
  currency?: string;
  style?: any;
}

const Currency = ({ amount, currency = "IDR", style = {} }: CurrencyProps) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return <Text style={style}>{formatted}</Text>;
};

export default Currency;
