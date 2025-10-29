import { LayoutDashboard, Receipt, Target, Settings } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const { t } = useApp();

  const tabs = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'expenses', label: t('nav.expenses'), icon: Receipt },
    { id: 'goals', label: t('nav.goals'), icon: Target },
    { id: 'settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative
                  ${isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
