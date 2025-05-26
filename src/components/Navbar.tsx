import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/context/AuthContext';
import { Menu, X, Search, Bookmark, Radar } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Case Studies', href: '/case-studies', icon: Search },
    { name: 'Narrative Radar', href: '/narrative-radar', icon: Radar },
    { name: 'Companies', href: '/companies' },
    { name: 'Submit', href: '/submit' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">LingoLab</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/saved" className="flex items-center gap-2">
                <Bookmark className="h-4 w-4" />
                Saved
              </Link>
            </Button>
          )}
          <ThemeToggle />
          <Button asChild>
            <Link to="/join">{isLoggedIn ? 'Dashboard' : 'Join'}</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t bg-background">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 pb-2">
              {isLoggedIn && (
                <Link
                  to="/saved"
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
                >
                  <Bookmark className="h-4 w-4" />
                  Saved
                </Link>
              )}
              <Link
                to="/join"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
              >
                {isLoggedIn ? 'Dashboard' : 'Join'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
