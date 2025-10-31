import { useApp } from '@/contexts/AppContext';
import { useCurrencyFormatter } from '@/lib/formatMoney';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const BudgetChart = () => {
  const { budget, getCategorySpent, t } = useApp();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { formatCurrency } = useCurrencyFormatter();

  const data = budget.categories.map(category => ({
    name: t(category.name),
    value: getCategorySpent(category.id, currentMonth),
    allocated: (budget.totalIncome * category.percentage) / 100,
    color: category.color,
  }));

  return (
    <ResponsiveContainer width="100%" height='88%'>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent, value }) => value > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ''}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => `${formatCurrency(value)}`}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
          labelStyle={{
            color: 'hsl(var(--foreground))',
            fontWeight: 600,
          }}
          itemStyle={{
            color: 'hsl(var(--foreground))',
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
