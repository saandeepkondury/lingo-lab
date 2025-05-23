
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
  };

  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-teal-500 to-coral-500 bg-clip-text text-transparent">Lingo<span className="text-teal-500">Lab</span></span>
          </Link>
          {isLoggedIn && (
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link 
                to="/case-studies" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Case Studies
              </Link>
              <Link 
                to="/submit" 
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Submit Lingo
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          
          <div className="flex space-x-2">
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                className="rounded-full" 
                onClick={handleLogout}>
                Sign out
              </Button>
            ) : (
              <Button className="rounded-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
                <Link to="/join">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>;
};

export default Navbar;
