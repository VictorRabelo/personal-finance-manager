import { useApp } from '@/contexts/AppContext';
import { Progress } from '@/components/ui/progress';
import { useCurrencyFormatter } from '@/lib/formatMoney';

export const CategoryBreakdown = () => {
  const { budget, getCategorySpent, t } = useApp();
  const currentMonth = new Date().toISOString().slice(0, 7);
  const { formatCurrency } = useCurrencyFormatter();

  return (
    <div className="space-y-4">
      {budget.categories.map(category => {
        const allocated = (budget.totalIncome * category.percentage) / 100;
        const spent = getCategorySpent(category.id, currentMonth);
        const percentage = (spent / allocated) * 100;
        const remaining = allocated - spent;

        return (
          <div key={category.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{t(category.name)}</span>
              <span className="text-muted-foreground">
                {formatCurrency(spent)} / {formatCurrency(allocated)}
              </span>
            </div>
            <Progress
              value={Math.min(percentage, 100)}
              className="h-2"
              style={{
                background: 'hsl(var(--muted))',
              }}
              indicatorStyle={{
                background: percentage > 100
                  ? 'hsl(var(--destructive))'
                  : percentage > 80
                    ? 'hsl(var(--warning))'
                    : category.color,
              }}
            />
            <div className="flex items-center justify-between text-xs">
              <span className={remaining >= 0 ? 'text-success' : 'text-destructive'}>
                {t('categories.remaining')}: {formatCurrency(Math.abs(remaining), true)}
              </span>
              <span className="text-muted-foreground">
                {percentage ? percentage.toFixed(0) : 0}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
