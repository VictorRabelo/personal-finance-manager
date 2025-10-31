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
import { CurrencyInput } from '@/components/ui/current-amount';

interface ExpenseFormProps {
  onClose: () => void;
}

export const ExpenseForm = ({ onClose }: ExpenseFormProps) => {
  const { budget, addExpense, t } = useApp();
  const [formData, setFormData] = useState({
    categoryId: '',
    amount: null,
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [validFields, setValidFields] = useState({
    categoryId: false,
    description: false,
    amount: false,
  });

  const isFormValid = validFields.categoryId && validFields.amount && validFields.description;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

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
          onValueChange={(value) => {
            setFormData({ ...formData, categoryId: value })
            setValidFields((prev) => ({ ...prev, categoryId: !!value }));
          }}
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
          onChange={(e) => {
            const val = e.target.value;

            setFormData({ ...formData, description: val })
            setValidFields((prev) => ({ ...prev, description: val.trim().length > 0 }));
          }}
          placeholder={t('expenses.description')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">{t('expenses.amount')}</Label>
        <CurrencyInput
          value={formData.amount}
          required={true}
          onChange={(val) => setFormData({ ...formData, amount: val })}
          onValidityChange={(isValid) => setValidFields((prev) => ({ ...prev, amount: isValid }))}
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
        <Button
          type="submit"
          className="flex-1 bg-gradient-primary"
          disabled={!isFormValid}
        >
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
};
