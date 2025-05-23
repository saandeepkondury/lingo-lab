import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-screen-2xl flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-coral-500 bg-clip-text text-transparent">
            Lingo<span className="text-teal-500">Lab</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn && (
            <Link 
              to="/case-studies" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/case-studies') ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Case Studies
            </Link>
          )}
          
          <Link 
            to="/pricing" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/pricing') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Pricing
          </Link>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            {isLoggedIn ? (
              <Button onClick={handleLogout} variant="outline" size="sm">
                Logout
              </Button>
            ) : (
              <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild>
                <Link to="/join">Login</Link>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border/40 md:hidden">
            <div className="container max-w-screen-2xl px-6 py-4 space-y-4">
              {isLoggedIn && (
                <Link 
                  to="/case-studies" 
                  className={`block text-sm font-medium transition-colors hover:text-primary ${
                    isActive('/case-studies') ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Case Studies
                </Link>
              )}
              
              <Link 
                to="/pricing" 
                className={`block text-sm font-medium transition-colors hover:text-primary ${
                  isActive('/pricing') ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Pricing
              </Link>
              
              <div className="pt-2">
                {isLoggedIn ? (
                  <Button onClick={handleLogout} variant="outline" size="sm" className="w-full">
                    Logout
                  </Button>
                ) : (
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white w-full" size="sm" asChild>
                    <Link to="/join" onClick={() => setIsOpen(false)}>Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
