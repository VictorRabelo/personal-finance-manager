import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trash2, Plus } from 'lucide-react';
import { format } from 'date-fns';

export const GoalList = () => {
  const { goals, deleteGoal, updateGoal, t } = useApp();

  if (goals.length === 0) {
    return (
      <Card className="p-12 text-center bg-gradient-card border-border/50">
        <p className="text-muted-foreground">{t('goals.noGoals')}</p>
      </Card>
    );
  }

  const handleAddProgress = (goalId: string, currentAmount: number) => {
    const amount = prompt(t('goals.current'));
    if (amount) {
      updateGoal(goalId, { currentAmount: currentAmount + parseFloat(amount) });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {goals.map(goal => {
        const progress = (goal.currentAmount / goal.targetAmount) * 100;
        const isCompleted = progress >= 100;
        
        return (
          <Card 
            key={goal.id}
            className="p-6 bg-gradient-card border-border/50 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground">{goal.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(goal.deadline), 'MMM dd, yyyy')}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteGoal(goal.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('goals.progress')}</span>
                  <span className="font-medium text-foreground">
                    ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                  </span>
                </div>
                <Progress 
                  value={Math.min(progress, 100)}
                  className="h-2"
                  indicatorStyle={{
                    background: isCompleted 
                      ? 'hsl(var(--success))' 
                      : 'var(--gradient-primary)',
                  }}
                />
                <div className="flex items-center justify-between text-xs">
                  <span className={isCompleted ? 'text-success font-medium' : 'text-muted-foreground'}>
                    {isCompleted ? t('goals.completed') : `${progress.toFixed(0)}%`}
                  </span>
                </div>
              </div>

              {!isCompleted && (
                <Button
                  onClick={() => handleAddProgress(goal.id, goal.currentAmount)}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('common.add')} {t('goals.progress')}
                </Button>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};
