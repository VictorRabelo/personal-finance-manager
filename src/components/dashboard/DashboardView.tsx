import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { DollarSign, TrendingDown, Wallet } from 'lucide-react';
import { BudgetChart } from './BudgetChart';
import { CategoryBreakdown } from './CategoryBreakdown';
import { RecentExpenses } from './RecentExpenses';

export const DashboardView = () => {
  const { budget, expenses, t, getCategorySpent } = useApp();
  
  const currentMonth = new Date().toISOString().slice(0, 7);
  const totalSpent = expenses
    .filter(e => e.month === currentMonth)
    .reduce((sum, e) => sum + e.amount, 0);
  
  const remaining = budget.totalIncome - totalSpent;

  const stats = [
    {
      label: t('dashboard.totalIncome'),
      value: budget.totalIncome,
      icon: DollarSign,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: t('dashboard.totalSpent'),
      value: totalSpent,
      icon: TrendingDown,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      label: t('dashboard.remaining'),
      value: remaining,
      icon: Wallet,
      color: remaining > 0 ? 'text-success' : 'text-warning',
      bgColor: remaining > 0 ? 'bg-success/10' : 'bg-warning/10',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('dashboard.title')}</h2>
        <p className="text-muted-foreground">{t('app.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 bg-gradient-card border-border/50 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    ${stat.value.toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-card border-border/50">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            {t('dashboard.distribution')}
          </h3>
          <BudgetChart />
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            {t('dashboard.categoryBreakdown')}
          </h3>
          <CategoryBreakdown />
        </Card>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          {t('dashboard.recentExpenses')}
        </h3>
        <RecentExpenses />
      </Card>
    </div>
  );
};
