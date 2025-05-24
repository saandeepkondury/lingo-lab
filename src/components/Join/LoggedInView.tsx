
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const LoggedInView = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out."
    });
  };

  return (
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
  );
};

export default LoggedInView;
