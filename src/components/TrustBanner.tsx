
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

const TrustBanner = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-teal-500 to-coral-500 bg-clip-text text-transparent">Lingo<span className="text-teal-500">Lab</span></span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button className="rounded-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
            <Link to="/join">
              <Shield className="w-4 h-4 mr-2" />
              Join Now
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TrustBanner;
