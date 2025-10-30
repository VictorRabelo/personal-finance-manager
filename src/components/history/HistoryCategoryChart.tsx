import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

type CategoryData = {
  id: string;
  name: string;
  value: number;
  color: string;
};

type HistoryCategoryChartProps = {
  data: CategoryData[];
  totalSpent: number;
  noDataLabel: string;
};

export const HistoryCategoryChart = ({ data, totalSpent, noDataLabel }: HistoryCategoryChartProps) => {
  const chartData = data.filter(item => item.value > 0);

  if (!chartData.length || totalSpent === 0) {
    return <p className="text-sm text-muted-foreground">{noDataLabel}</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
        >
          {chartData.map(item => (
            <Cell key={item.id} fill={item.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [`$${value.toFixed(2)}`, name]}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '12px',
          }}
          labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600 }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
