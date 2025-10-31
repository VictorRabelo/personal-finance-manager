import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { formatLocalDate } from "@/lib/formatLocalDate";
import { useCurrencyFormatter } from '@/lib/formatMoney';

export const ExpenseList = () => {
  const { expenses, budget, language, deleteExpense, t } = useApp();
  console.log("🚀 ~ ExpenseList ~ expenses:", expenses)
  const { formatCurrency } = useCurrencyFormatter();

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (sortedExpenses.length === 0) {
    return (
      <Card className="p-12 text-center bg-gradient-card border-border/50">
        <p className="text-muted-foreground">{t('expenses.noExpenses')}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {sortedExpenses.map(expense => {
        const category = budget.categories.find(c => c.id === expense.categoryId);

        return (
          <Card
            key={expense.id}
            className="p-4 bg-gradient-card border-border/50 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category?.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{expense.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{t(category?.name)}</span>
                    <span>•</span>
                    <span>{formatLocalDate(expense.date, language)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-foreground">
                  {formatCurrency(expense.amount)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteExpense(expense.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
