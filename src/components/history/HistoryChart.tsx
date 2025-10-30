import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useMemo } from 'react';

type MonthTotals = {
  month: string;
  total: number;
};

type HistoryChartProps = {
  data: MonthTotals[];
  monthLabels: Record<string, string>;
  selectedMonth: string;
  onMonthSelect?: (month: string) => void;
  totalLabel: string;
};

export const HistoryChart = ({
  data,
  monthLabels,
  selectedMonth,
  onMonthSelect,
  totalLabel,
}: HistoryChartProps) => {
  const chartData = useMemo(
    () =>
      data.map(item => ({
        key: item.month,
        label: monthLabels[item.month] || item.month,
        total: Number(item.total.toFixed(2)),
      })),
    [data, monthLabels],
  );

  const config = useMemo(
    () => ({
      total: {
        label: totalLabel,
        color: 'hsl(var(--primary))',
      },
    }),
    [totalLabel],
  );

  const handleBarClick = (entry: unknown) => {
    if (!onMonthSelect) return;

    const payload = entry as { key?: string } | undefined;
    if (payload?.key) {
      onMonthSelect(payload.key);
    }
  };

  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
        <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          tickLine={false}
          axisLine={false}
          width={60}
          tickFormatter={(value: number) => `$${value.toFixed(0)}`}
        />
        <ChartTooltip
          content={<ChartTooltipContent />}
          cursor={{ fill: 'hsl(var(--muted) / 0.2)' }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, totalLabel]}
        />
        <Bar dataKey="total" radius={[6, 6, 0, 0]} onClick={handleBarClick}>
          {chartData.map(entry => (
            <Cell
              key={entry.key}
              cursor={onMonthSelect ? 'pointer' : 'default'}
              fill={
                selectedMonth === 'all' || selectedMonth === entry.key
                  ? 'var(--color-total)'
                  : 'hsl(var(--muted-foreground) / 0.3)'
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
