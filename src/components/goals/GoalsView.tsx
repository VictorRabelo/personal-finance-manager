import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { GoalForm } from './GoalForm';
import { GoalList } from './GoalList';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export const GoalsView = () => {
  const { t } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t('goals.title')}</h2>
          <p className="text-muted-foreground">{t('goals.progress')}</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-gradient-success hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t('goals.addGoal')}
        </Button>
      </div>

      <GoalList />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('goals.addGoal')}</DialogTitle>
          </DialogHeader>
          <GoalForm onClose={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
