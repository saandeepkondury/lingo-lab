
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const SignupForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock signup - redirect to case studies to show locked content, then to pricing
    setTimeout(() => {
      login(); // Log them in for demo
      toast({
        title: "Account Created",
        description: "Please choose a plan to unlock all case studies."
      });
      // Redirect to case studies with state indicating they just signed up
      navigate('/case-studies', { state: { justSignedUp: true } });
      setIsLoading(false);
    }, 1500);
  };

  return (
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
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          After signup, you'll see our case studies and can choose a plan
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
