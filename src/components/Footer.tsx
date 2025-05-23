
import { Link } from 'react-router-dom';
import { Mail, Twitter, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';

const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container max-w-screen-2xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-coral-500 bg-clip-text text-transparent">Lingo<span className="text-teal-500">Lab</span></span>
            </Link>
            <p className="text-muted-foreground max-w-xs mb-6">
              Decoding the language of successful startups and helping founders craft powerful strategic narratives.
            </p>
            <Button variant="outline" className="rounded-full flex items-center" asChild>
              <a href="mailto:hello@lingolab.site">
                <Mail className="mr-2 h-4 w-4" />
                hello@lingolab.site
              </a>
            </Button>
          </div>
          
          {isLoggedIn && (
            <div>
              <h3 className="font-medium text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/saved" className="text-muted-foreground hover:text-foreground transition-colors">Saved Case Studies</Link></li>
                <li><Link to="/submit" className="text-muted-foreground hover:text-foreground transition-colors">Submit Lingo</Link></li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Lingo Lab. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className="flex items-center space-x-4 mr-4">
              <a href="https://x.com/LingoLabSite" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/lingolab-site/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:hello@lingolab.site" className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
