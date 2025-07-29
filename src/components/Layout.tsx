import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Users, GraduationCap } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">HR Training Module</h1>
              <p className="text-sm text-muted-foreground">
                {user?.role === 'hr_admin' ? 'HR Administration' : 'Mentor Dashboard'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {user?.role === 'hr_admin' ? (
                <Users className="w-4 h-4 text-primary" />
              ) : (
                <GraduationCap className="w-4 h-4 text-primary" />
              )}
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user?.role.replace('_', ' ')}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;