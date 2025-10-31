import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CurrencyInput } from '@/components/ui/current-amount';

interface GoalFormProps {
  onClose: () => void;
}

export const GoalForm = ({ onClose }: GoalFormProps) => {
  const { addGoal, t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: null,
    currentAmount: null,
    deadline: '',
  });

  const [validFields, setValidFields] = useState({
    name: false,
    targetAmount: false,
    deadline: false,
  });

  const isFormValid = validFields.name && validFields.targetAmount && validFields.deadline;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    addGoal({
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount) || 0,
      deadline: formData.deadline,
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">{t('goals.name')}</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, name: val });
            setValidFields((prev) => ({ ...prev, name: val.trim().length > 0 }));
          }}
          placeholder={t('goals.name')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAmount">{t('goals.target')}</Label>
        <CurrencyInput
          id={"targetAmount"}
          value={formData.targetAmount}
          required={true}
          onChange={(val) => setFormData({ ...formData, targetAmount: val })}
          onValidityChange={(isValid) => setValidFields((prev) => ({ ...prev, targetAmount: isValid }))}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAmount">{t('goals.current')}</Label>
        <CurrencyInput
          id={"currentAmount"}
          value={formData.currentAmount}
          onChange={(val) => setFormData({ ...formData, currentAmount: val })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">{t('goals.deadline')}</Label>
        <Input
          id="deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => {
            const val = e.target.value;
            setFormData({ ...formData, deadline: val });
            setValidFields((prev) => ({ ...prev, deadline: !!val }));
          }}
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-gradient-success"
          disabled={!isFormValid}
        >
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
};
