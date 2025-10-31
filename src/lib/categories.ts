import { Category, CategoryIcon } from '@/types';

export const CATEGORY_ICON_OPTIONS: CategoryIcon[] = [
  'Home',
  'Coffee',
  'Target',
  'Heart',
  'TrendingUp',
  'BookOpen',
];

export const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'categories.fixedCosts', percentage: 30, color: '#ef4444', icon: 'Home' },
  { id: '2', name: 'categories.comfort', percentage: 20, color: '#f59e0b', icon: 'Coffee' },
  { id: '3', name: 'categories.goals', percentage: 20, color: '#10b981', icon: 'Target' },
  { id: '4', name: 'categories.pleasures', percentage: 15, color: '#8b5cf6', icon: 'Heart' },
  { id: '5', name: 'categories.financialFreedom', percentage: 10, color: '#06b6d4', icon: 'TrendingUp' },
  { id: '6', name: 'categories.knowledge', percentage: 5, color: '#3b82f6', icon: 'BookOpen' },
];

export const getDefaultCategories = (): Category[] =>
  DEFAULT_CATEGORIES.map(category => ({ ...category }));

export const normalizeCategoryPercentages = (categories: Category[]): Category[] => {
  if (!categories.length) {
    return [];
  }

  const total = categories.reduce((sum, category) => sum + category.percentage, 0);

  if (total === 0) {
    const base = Math.floor(100 / categories.length);
    let remainder = 100 - base * categories.length;
    return categories.map((category, index) => {
      const value = base + (remainder > 0 ? 1 : 0);
      remainder = Math.max(0, remainder - 1);
      return { ...category, percentage: value };
    });
  }

  const normalized = categories.map(category => ({
    ...category,
    percentage: Math.max(0, Math.round((category.percentage / total) * 100)),
  }));

  let diff = 100 - normalized.reduce((sum, category) => sum + category.percentage, 0);

  let index = 0;
  const maxIterations = normalized.length * 10;

  while (diff !== 0 && index < maxIterations) {
    const currentIndex = index % normalized.length;
    const current = normalized[currentIndex];

    if (diff > 0) {
      normalized[currentIndex] = {
        ...current,
        percentage: current.percentage + 1,
      };
      diff -= 1;
    } else if (current.percentage > 0) {
      normalized[currentIndex] = {
        ...current,
        percentage: current.percentage - 1,
      };
      diff += 1;
    }

    index += 1;
  }

  return normalized;
};

export const rebalanceCategories = (
  categories: Category[],
  targetId: string,
  targetValue: number,
): Category[] => {
  const target = categories.find(category => category.id === targetId);
  if (!target) return categories;

  const clampedValue = Math.min(100, Math.max(0, Math.round(targetValue)));
  const others = categories.filter(category => category.id !== targetId);

  if (!others.length) {
    return categories.map(category =>
      category.id === targetId
        ? { ...category, percentage: 100 }
        : category,
    );
  }

  const othersTotal = others.reduce((sum, category) => sum + category.percentage, 0);
  const available = 100 - clampedValue;

  let remainder = available;

  const updatedOthers = others.map((category, index) => {
    if (index === others.length - 1) {
      return { ...category, percentage: Math.max(0, remainder) };
    }

    if (othersTotal === 0) {
      const base = Math.floor(available / others.length);
      const value = Math.min(Math.max(0, base), remainder);
      remainder -= value;
      return { ...category, percentage: value };
    }

    const proportional = (category.percentage / othersTotal) * available;
    const value = Math.min(Math.max(0, Math.round(proportional)), remainder);
    remainder -= value;
    return { ...category, percentage: value };
  });

  const updatedTarget = { ...target, percentage: clampedValue };

  const updatedMap = new Map<string, Category>([
    [updatedTarget.id, updatedTarget],
    ...updatedOthers.map(category => [category.id, category]),
  ]);

  return categories.map(category => {
    const updated = updatedMap.get(category.id);
    return updated ? updated : category;
  });
};
