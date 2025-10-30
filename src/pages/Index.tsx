import { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import { Header } from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { ExpensesView } from '@/components/expenses/ExpensesView';
import { GoalsView } from '@/components/goals/GoalsView';
import { SettingsView } from '@/components/settings/SettingsView';
import { HistoryView } from '@/components/history/HistoryView';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'expenses':
        return <ExpensesView />;
      case 'history':
        return <HistoryView />;
      case 'goals':
        return <GoalsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderView()}
        </main>
      </div>
    </AppProvider>
  );
};

export default Index;
