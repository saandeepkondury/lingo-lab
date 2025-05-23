
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="mt-16 text-center">
      <p className="text-muted-foreground mb-4">
        Need help choosing the right plan? Have special requirements?
      </p>
      <Button variant="outline" size="lg" asChild>
        <a href="mailto:hello@lingolab.site">
          <Mail className="mr-2 h-4 w-4" />
          Contact Us
        </a>
      </Button>
    </div>
  );
};

export default ContactSection;
