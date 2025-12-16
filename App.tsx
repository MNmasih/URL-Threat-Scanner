import React, { useState } from 'react';
import { Shield, LayoutDashboard, Search, BookOpen, Menu, X } from 'lucide-react';
import Scanner from './components/Scanner';
import Dashboard from './components/Dashboard';
import Education from './components/Education';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.SCANNER);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ view, icon, label }: { view: AppView; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full md:w-auto ${
        currentView === view
          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-cyber-900 text-gray-100 selection:bg-cyan-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <nav className="sticky top-0 z-50 glass-panel border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView(AppView.DASHBOARD)}>
              <div className="relative">
                <Shield className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400 blur-lg opacity-40 animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">
                LinkGuardian
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <NavItem view={AppView.DASHBOARD} icon={<LayoutDashboard size={18} />} label="Dashboard" />
              <NavItem view={AppView.SCANNER} icon={<Search size={18} />} label="Scanner" />
              <NavItem view={AppView.EDUCATION} icon={<BookOpen size={18} />} label="Learn" />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-gray-800 animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem view={AppView.DASHBOARD} icon={<LayoutDashboard size={18} />} label="Dashboard" />
              <NavItem view={AppView.SCANNER} icon={<Search size={18} />} label="Scanner" />
              <NavItem view={AppView.EDUCATION} icon={<BookOpen size={18} />} label="Learn" />
            </div>
          </div>
        )}
      </nav>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentView === AppView.DASHBOARD && <Dashboard />}
        {currentView === AppView.SCANNER && <Scanner />}
        {currentView === AppView.EDUCATION && <Education />}
      </main>

      <footer className="relative border-t border-gray-800 mt-12 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} LinkGuardian AI. Secure your digital footprint.</p>
        <p className="mt-2 text-xs opacity-60">Powered by Google Gemini 2.5 Flash & Google Search Grounding</p>
      </footer>
    </div>
  );
};

export default App;