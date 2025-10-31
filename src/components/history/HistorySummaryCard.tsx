import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HistoryCategoryChart } from './HistoryCategoryChart';
import { useCurrencyFormatter } from '@/lib/formatMoney';

export type HistorySummaryCategory = {
  id: string;
  name: string;
  value: number;
  percentage: number;
  color: string;
};

type HistorySummaryCardProps = {
  plannedIncome: number;
  totalSpent: number;
  remaining: number;
  periodLabel: string;
  categories: HistorySummaryCategory[];
  summaryTitle: string;
  summaryDescription: string;
  totalIncomeLabel: string;
  totalSpentLabel: string;
  remainingLabel: string;
  categoryDistributionLabel: string;
  noDataLabel: string;
};

export const HistorySummaryCard = ({
  plannedIncome,
  totalSpent,
  remaining,
  periodLabel,
  categories,
  summaryTitle,
  summaryDescription,
  totalIncomeLabel,
  totalSpentLabel,
  remainingLabel,
  categoryDistributionLabel,
  noDataLabel,
}: HistorySummaryCardProps) => {

  const { formatCurrency } = useCurrencyFormatter();

  const stats = [
    {
      label: totalIncomeLabel,
      value: `${formatCurrency(plannedIncome)}`,
      accent: 'text-primary',
    },
    {
      label: totalSpentLabel,
      value: `${formatCurrency(totalSpent)}`,
      accent: 'text-destructive',
    },
    {
      label: remainingLabel,
      value: `${formatCurrency(remaining)}`,
      accent: remaining >= 0 ? 'text-success' : 'text-destructive',
    },
  ];

  const categoryItems = categories.filter(category => category.value > 0);

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{summaryTitle}</h3>
            <p className="text-sm text-muted-foreground">{summaryDescription}</p>
          </div>
          <Badge variant="outline" className="w-fit border-border/60 bg-background/60 px-3 py-1 text-xs uppercase tracking-wide">
            {periodLabel}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map(stat => (
            <div key={stat.label} className="rounded-xl bg-card/60 p-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
              <p className={`mt-2 text-2xl font-semibold ${stat.accent}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {categoryDistributionLabel}
            </h4>
            {categoryItems.length ? (
              <div className="space-y-3">
                {categoryItems.map(category => (
                  <div key={category.id} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="font-medium text-foreground">{category.name}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {formatCurrency(category.value)} • {category.percentage.toFixed(0)}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{noDataLabel}</p>
            )}
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-xs">
              <HistoryCategoryChart data={categories} totalSpent={totalSpent} noDataLabel={noDataLabel} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
