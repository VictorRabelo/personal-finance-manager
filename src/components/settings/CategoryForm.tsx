import { useState } from 'react';
import { Category, CategoryIcon } from '@/types';
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
import { CATEGORY_ICON_OPTIONS } from '@/lib/categories';
import { cn } from '@/lib/utils';
import { CATEGORY_ICON_COMPONENTS } from './category-icons';

export interface CategoryFormValues {
  name: string;
  percentage: number;
  color: string;
  icon: CategoryIcon;
}

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: (values: CategoryFormValues) => void;
  onCancel: () => void;
  t: (key: string) => string;
}

const getInitialName = (category: Category | undefined, translate: (key: string) => string) => {
  if (!category) {
    return '';
  }

  if (category.name.startsWith('categories.')) {
    return translate(category.name);
  }

  return category.name;
};

export const CategoryForm = ({ initialData, onSubmit, onCancel, t }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name: getInitialName(initialData, t),
    percentage: initialData?.percentage ?? 10,
    color: initialData?.color ?? '#3b82f6',
    icon: initialData?.icon ?? CATEGORY_ICON_OPTIONS[0],
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    onSubmit({
      name: formData.name.trim(),
      percentage: Math.max(0, Math.min(100, Number(formData.percentage) || 0)),
      color: formData.color,
      icon: formData.icon,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category-name">{t('categories.name')}</Label>
        <Input
          id="category-name"
          value={formData.name}
          onChange={(event) =>
            setFormData(prev => ({ ...prev, name: event.target.value }))
          }
          placeholder={t('categories.name')}
          required
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category-percentage">{t('categories.percentage')}</Label>
          <Input
            id="category-percentage"
            type="number"
            min={0}
            max={100}
            step={1}
            value={formData.percentage}
            onChange={(event) =>
              setFormData(prev => ({ ...prev, percentage: Number(event.target.value) }))
            }
            required
          />
          <p className="text-xs text-muted-foreground">
            {t('categories.percentageHelper')}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category-color">{t('categories.color')}</Label>
          <div className="flex items-center gap-3">
            <Input
              id="category-color"
              type="color"
              value={formData.color}
              onChange={(event) =>
                setFormData(prev => ({ ...prev, color: event.target.value }))
              }
              className="h-10 w-14 cursor-pointer"
            />
            <Input
              value={formData.color}
              onChange={(event) =>
                setFormData(prev => ({ ...prev, color: event.target.value }))
              }
              className="font-mono"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t('categories.icon')}</Label>
        <Select
          value={formData.icon}
          onValueChange={(value: CategoryIcon) =>
            setFormData(prev => ({ ...prev, icon: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORY_ICON_OPTIONS.map(option => {
              const Icon = CATEGORY_ICON_COMPONENTS[option];
              return (
                <SelectItem key={option} value={option}>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full border border-border/50',
                      )}
                      style={{ backgroundColor: formData.color }}
                    >
                      <Icon className="h-4 w-4 text-background" />
                    </span>
                    <span>{option}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          {t('common.cancel')}
        </Button>
        <Button type="submit" className="flex-1 bg-gradient-primary">
          {t(initialData ? 'common.save' : 'common.add')}
        </Button>
      </div>
    </form>
  );
};
