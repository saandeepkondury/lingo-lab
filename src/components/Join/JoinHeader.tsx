
import { Shield } from 'lucide-react';

const JoinHeader = () => {
  return (
    <div className="text-center mb-8">
      <Shield className="h-12 w-12 mx-auto mb-4 text-teal-500" />
      <h1 className="text-3xl font-bold mb-2">Welcome to LingoLab</h1>
      <p className="text-muted-foreground">
        Join our community of lingo enthusiasts
      </p>
    </div>
  );
};

export default JoinHeader;
