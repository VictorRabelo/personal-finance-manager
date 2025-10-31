import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ConfirmDeleteDialog } from '../common/ConfirmDeleteDialog';

export const ExpensesView = () => {
  const { expenses, t, deleteAllExpenses } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t('expenses.title')}</h2>
          <p className="text-muted-foreground">{t('expenses.history')}</p>
        </div>

        <div className="flex items-center gap-2">

          {expenses.length > 0 && (
            <ConfirmDeleteDialog
              titleKey="expenses.deleteAll"
              descriptionKey="alerts.confirmDeleteAll"
              buttonLabelKey="expenses.deleteAll"
              onConfirm={deleteAllExpenses}
            />
          )}

          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t("expenses.addExpense")}
          </Button>
        </div>
      </div>

      <ExpenseList />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('expenses.addExpense')}</DialogTitle>
          </DialogHeader>
          <ExpenseForm onClose={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
