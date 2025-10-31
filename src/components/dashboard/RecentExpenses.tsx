import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { formatLocalDate } from "@/lib/formatLocalDate";
import { useCurrencyFormatter } from '@/lib/formatMoney';

export const RecentExpenses = () => {
  const { expenses, budget, language, deleteExpense, t } = useApp();
  const { formatCurrency } = useCurrencyFormatter();

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  if (recentExpenses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t('expenses.noExpenses')}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {recentExpenses.map(expense => {
        const category = budget.categories.find(c => c.id === expense.categoryId);

        return (
          <div
            key={expense.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category?.color }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{expense.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{t(category?.name)}</span>
                  <span>•</span>
                  <span>{formatLocalDate(expense.date, language)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-foreground">{formatCurrency(expense.amount)}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteExpense(expense.id)}
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
