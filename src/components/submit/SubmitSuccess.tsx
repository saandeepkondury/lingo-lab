
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface SubmitSuccessProps {
  onReset: () => void;
}

const SubmitSuccess = ({ onReset }: SubmitSuccessProps) => {
  return (
    <div className="bg-muted/30 rounded-lg p-8 text-center space-y-6">
      <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-teal-600" />
      </div>
      <h3 className="text-2xl font-semibold">Request Received!</h3>
      <p className="text-muted-foreground">
        Thank you for sharing your lingo story. Our team will review your submission and reach
        out to schedule an interview if your narrative is selected for a feature.
      </p>
      <Button 
        variant="outline" 
        onClick={onReset}
      >
        Submit Another
      </Button>
    </div>
  );
};

export default SubmitSuccess;
