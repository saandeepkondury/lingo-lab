import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Shield, LogIn, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Join = () => {
  const { isLoggedIn, login, logout, checkSubscription } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - simulate checking if user has paid subscription
    setTimeout(async () => {
      login();
      
      // Check subscription status after login
      await checkSubscription();
      
      // For demo purposes, simulate that some users might not have subscriptions
      const hasSubscription = Math.random() > 0.3; // 70% chance of having subscription for demo
      
      if (!hasSubscription) {
        toast({
          title: "Subscription Required",
          description: "Please complete your subscription to access your account.",
          variant: "destructive"
        });
        navigate('/pricing');
        setIsLoading(false);
        return;
      }

      toast({
        title: "Welcome back to LingoLab",
        description: "You've successfully logged in."
      });
      navigate('/case-studies');
      setIsLoading(false);
    }, 1500);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock signup - redirect to pricing to complete account setup
    setTimeout(() => {
      toast({
        title: "Account Created",
        description: "Please choose a plan to complete your account setup."
      });
      navigate('/pricing', { state: { fromSignup: true } });
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
            Join our community of lingo enthusiasts
          </p>
        </div>

        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
            <TabsTrigger value="signin" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
                {isLoading ? "Creating account..." : "Create Account & Choose Plan"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                After signup, you'll choose a plan to complete your account
              </p>
            </div>
          </TabsContent>

          <TabsContent value="signin">
            <form onSubmit={handleLogin} className="space-y-4">
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
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Only users with active subscriptions can sign in
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            For demo purposes, you can enter any information
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Join;
