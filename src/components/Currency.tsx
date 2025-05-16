
interface CurrencyProps {
  amount: number;
  currency?: string;
}

const Currency = ({ amount, currency = "IDR" }: CurrencyProps) => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return <span>{formatted}</span>;
};

export default Currency;
