import { useAuth } from '@/contexts/AuthContext';
import Login from '@/components/Login';
import Layout from '@/components/Layout';
import HRDashboard from '@/components/hr/HRDashboard';
import MentorDashboard from '@/components/mentor/MentorDashboard';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      {user.role === 'hr_admin' ? <HRDashboard /> : <MentorDashboard />}
    </Layout>
  );
};

export default Index;
