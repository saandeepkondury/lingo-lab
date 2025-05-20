import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Shield } from 'lucide-react';

const Join = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - in a real app, this would be an API call
    setTimeout(() => {
      login();
      toast({
        title: "Welcome to LingoLab",
        description: "You've successfully logged in."
      });
      navigate('/case-studies');
      setIsLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out."
    });
  };

  if (isLoggedIn) {
    return (
      <Layout>
        <div className="container max-w-md mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">You're Already Logged In</h1>
            <p className="mb-8 text-muted-foreground">
              You are currently logged into LingoLab.
            </p>
            <div className="flex flex-col gap-4">
              <Button 
                onClick={() => navigate('/case-studies')}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                View Case Studies
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-md mx-auto px-6 py-24">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 mx-auto mb-4 text-teal-500" />
          <h1 className="text-3xl font-bold mb-2">Welcome to LingoLab</h1>
          <p className="text-muted-foreground">
            Enter your credentials to access all case studies and features
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            For demo purposes, you can enter any email and password
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Join;
