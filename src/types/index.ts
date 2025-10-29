export interface Category {
  id: string;
  name: string;
  percentage: number;
  color: string;
  icon: string;
}

export interface Expense {
  id: string;
  categoryId: string;
  amount: number;
  description: string;
  date: string;
  month: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  categoryId?: string;
}

export interface Budget {
  totalIncome: number;
  categories: Category[];
}

export type Language = 'pt-BR' | 'en';

export type Theme = 'light' | 'dark';
