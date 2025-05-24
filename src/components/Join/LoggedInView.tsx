
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const LoggedInView = () => {
  return (
    <div className="text-center space-y-6">
      <div className="flex justify-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      
      <div>
        <h1 className="text-3xl font-semibold mb-4">Welcome to LingoLab!</h1>
        <p className="text-lg text-muted-foreground mb-6">
          You're successfully logged in. Ready to explore strategic narratives?
        </p>
      </div>

      <div className="space-y-4">
        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
          <Link to="/pricing">Choose Your Plan</Link>
        </Button>
        
        <Button variant="outline" className="w-full" asChild>
          <Link to="/case-studies">Browse Case Studies</Link>
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Start with a subscription plan to unlock the full library of case studies and premium features.
      </p>
    </div>
  );
};

export default LoggedInView;
