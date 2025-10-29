import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ExpenseFormProps {
  onClose: () => void;
}

export const ExpenseForm = ({ onClose }: ExpenseFormProps) => {
  const { budget, addExpense, t } = useApp();
  const [formData, setFormData] = useState({
    categoryId: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId || !formData.amount || !formData.description) {
      return;
    }

    addExpense({
      categoryId: formData.categoryId,
      amount: parseFloat(formData.amount),
      description: formData.description,
      date: formData.date,
      month: formData.date.slice(0, 7),
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">{t('expenses.category')}</Label>
        <Select
          value={formData.categoryId}
          onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t('expenses.selectCategory')} />
          </SelectTrigger>
          <SelectContent>
            {budget.categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {t(category.name)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t('expenses.description')}</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder={t('expenses.description')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">{t('expenses.amount')}</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="0.00"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">{t('expenses.date')}</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          {t('common.cancel')}
        </Button>
        <Button type="submit" className="flex-1 bg-gradient-primary">
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
};
