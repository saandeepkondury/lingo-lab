
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login - simulate checking if user has paid subscription
    setTimeout(() => {
      // For demo purposes, simulate that users without a subscription can't login
      // In a real app, this would check the subscription status
      const hasSubscription = Math.random() > 0.7; // 30% chance of having subscription for demo
      
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

      login();
      toast({
        title: "Welcome back to LingoLab",
        description: "You've successfully logged in."
      });
      // Redirect to case studies with state indicating they just signed in
      navigate('/case-studies', { state: { justSignedIn: true } });
      setIsLoading(false);
    }, 1500);
  };

  return (
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
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Only users with active subscriptions can sign in
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
