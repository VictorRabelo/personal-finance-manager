import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Save } from 'lucide-react';

export const SettingsView = () => {
  const { budget, updateBudget, updateCategoryPercentages, t } = useApp();
  const [income, setIncome] = useState(budget.totalIncome.toString());
  const [categories, setCategories] = useState(budget.categories);

  const handlePercentageChange = (categoryId: string, value: number) => {
    const updatedCategories = categories.map(cat =>
      cat.id === categoryId ? { ...cat, percentage: value } : cat
    );
    setCategories(updatedCategories);
  };

  const handleSave = () => {
    const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0);
    
    if (totalPercentage !== 100) {
      alert(t('categories.totalMustBe100'));
      return;
    }

    updateBudget({
      totalIncome: parseFloat(income),
      categories,
    });
  };

  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('settings.title')}</h2>
        <p className="text-muted-foreground">
          {t('app.subtitle')}
        </p>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="income" className="text-lg font-semibold">
              {t('settings.income')}
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="income"
                type="number"
                step="0.01"
                min="0"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="pl-10 text-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                {t('categories.title')}
              </h3>
              <span className={`text-sm font-medium ${
                totalPercentage === 100 ? 'text-success' : 'text-destructive'
              }`}>
                {totalPercentage}%
              </span>
            </div>

            <div className="space-y-6">
              {categories.map(category => {
                const allocated = (parseFloat(income) * category.percentage) / 100;
                
                return (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="font-medium">{category.name}</Label>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">{category.percentage}%</span>
                        <span className="font-medium">${allocated.toFixed(2)}</span>
                      </div>
                    </div>
                    <Slider
                      value={[category.percentage]}
                      onValueChange={(value) => handlePercentageChange(category.id, value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <Button 
            onClick={handleSave}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
            disabled={totalPercentage !== 100}
          >
            <Save className="h-4 w-4 mr-2" />
            {t('common.save')}
          </Button>
        </div>
      </Card>
    </div>
  );
};
