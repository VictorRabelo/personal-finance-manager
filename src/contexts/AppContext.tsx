import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Budget, Category, Expense, Goal, Language, Theme } from '@/types';
import { translations } from '@/i18n/translations';
import { toast } from '@/hooks/use-toast';

interface AppContextType {
  budget: Budget;
  expenses: Expense[];
  goals: Goal[];
  theme: Theme;
  language: Language;
  t: (key: string, params?: Record<string, string>) => string;
  updateBudget: (budget: Budget) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  updateCategoryPercentages: (categories: Category[]) => void;
  getExpensesByMonth: (month: string) => Expense[];
  getCategorySpent: (categoryId: string, month?: string) => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'categories.fixedCosts', percentage: 30, color: '#ef4444', icon: 'Home' },
  { id: '2', name: 'categories.comfort', percentage: 20, color: '#f59e0b', icon: 'Coffee' },
  { id: '3', name: 'categories.goals', percentage: 20, color: '#10b981', icon: 'Target' },
  { id: '4', name: 'categories.pleasures', percentage: 15, color: '#8b5cf6', icon: 'Heart' },
  { id: '5', name: 'categories.financialFreedom', percentage: 10, color: '#06b6d4', icon: 'TrendingUp' },
  { id: '6', name: 'categories.knowledge', percentage: 5, color: '#3b82f6', icon: 'BookOpen' },
];

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [budget, setBudget] = useState<Budget>(() => {
    const saved = localStorage.getItem('budget');
    return saved ? JSON.parse(saved) : { totalIncome: 5000, categories: DEFAULT_CATEGORIES };
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'dark';
  });

  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string, params?: Record<string, string>) => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    if (typeof value === 'string' && params) {
      return Object.entries(params).reduce(
        (acc, [key, val]) => acc.replace(`{{${key}}}`, val),
        value
      );
    }

    return value || key;
  };

  const updateBudget = (newBudget: Budget) => {
    setBudget(newBudget);
    toast({
      title: t('common.success'),
      description: t('alerts.incomeUpdated'),
    });
  };

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Date.now().toString() };
    setExpenses([...expenses, newExpense]);

    const category = budget.categories.find(c => c.id === expense.categoryId);
    const spent = getCategorySpent(expense.categoryId, expense.month) + expense.amount;
    const allocated = (budget.totalIncome * (category?.percentage || 0)) / 100;
    const percentage = Math.round((spent / allocated) * 100);

    if (percentage >= 80 && percentage < 100) {
      toast({
        title: t('common.error'),
        description: t('alerts.budgetWarning', {
          percentage: percentage.toString(),
          category: t(category?.name) || ''
        }),
        variant: 'destructive',
      });
    } else if (percentage >= 100) {
      toast({
        title: t('common.error'),
        description: t('alerts.budgetExceeded', { category: t(category?.name) || '' }),
        variant: 'destructive',
      });
    } else {
      toast({
        title: t('common.success'),
        description: t('alerts.expenseAdded'),
      });
    }
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
    toast({
      title: t('common.success'),
      description: t('alerts.expenseDeleted'),
    });
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = { ...goal, id: Date.now().toString() };
    setGoals([...goals, newGoal]);
    toast({
      title: t('common.success'),
      description: t('alerts.goalAdded'),
    });
  };

  const updateGoal = (id: string, updatedGoal: Partial<Goal>) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const updated = { ...g, ...updatedGoal };
        if (updated.currentAmount >= updated.targetAmount) {
          toast({
            title: t('common.success'),
            description: t('alerts.goalAchieved', { goal: updated.name }),
          });
        }
        return updated;
      }
      return g;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
    toast({
      title: t('common.success'),
      description: t('alerts.goalDeleted'),
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateCategoryPercentages = (categories: Category[]) => {
    setBudget({ ...budget, categories });
  };

  const getExpensesByMonth = (month: string) => {
    return expenses.filter(e => e.month === month);
  };

  const getCategorySpent = (categoryId: string, month?: string) => {
    const currentMonth = month || new Date().toISOString().slice(0, 7);
    return expenses
      .filter(e => e.categoryId === categoryId && e.month === currentMonth)
      .reduce((sum, e) => sum + e.amount, 0);
  };

  return (
    <AppContext.Provider value={{
      budget,
      expenses,
      goals,
      theme,
      language,
      t,
      updateBudget,
      addExpense,
      deleteExpense,
      addGoal,
      updateGoal,
      deleteGoal,
      toggleTheme,
      setLanguage,
      updateCategoryPercentages,
      getExpensesByMonth,
      getCategorySpent,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
