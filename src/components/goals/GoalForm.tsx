import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GoalFormProps {
  onClose: () => void;
}

export const GoalForm = ({ onClose }: GoalFormProps) => {
  const { addGoal, t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount || !formData.deadline) {
      return;
    }

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
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={t('goals.name')}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAmount">{t('goals.target')}</Label>
        <Input
          id="targetAmount"
          type="number"
          step="0.01"
          min="0"
          value={formData.targetAmount}
          onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
          placeholder="0.00"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="currentAmount">{t('goals.current')}</Label>
        <Input
          id="currentAmount"
          type="number"
          step="0.01"
          min="0"
          value={formData.currentAmount}
          onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
          placeholder="0.00"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">{t('goals.deadline')}</Label>
        <Input
          id="deadline"
          type="date"
          value={formData.deadline}
          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          {t('common.cancel')}
        </Button>
        <Button type="submit" className="flex-1 bg-gradient-success">
          {t('common.save')}
        </Button>
      </div>
    </form>
  );
};
