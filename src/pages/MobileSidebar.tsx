
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from '@/context/AuthContext';

const MobileSidebar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button */}
      <div className="p-4 border-b border-border/40 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="ml-4 text-xl font-serif font-bold bg-gradient-to-r from-teal-500 to-coral-500 bg-clip-text text-transparent">
          Lingo<span className="text-teal-500">Lab</span>
        </span>
      </div>
      
      {/* Navigation links */}
      <nav className="flex-1 py-8 px-6 flex flex-col space-y-6 text-lg font-medium">
        <Link to="/" className="hover:text-teal-600">Home</Link>
        <Link to="/case-studies" className="hover:text-teal-600">Case Studies</Link>
        <Link to="/submit" className="hover:text-teal-600">Submit Lingo</Link>
        <Link to="/newsletter" className="hover:text-teal-600">Newsletter</Link>
        
        <div className="flex items-center space-x-4 py-4">
          <ThemeToggle />
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <Link to="/case-studies" aria-label="Search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="mt-auto pt-8">
          {isLoggedIn ? (
            <Button 
              variant="outline" 
              className="rounded-full w-full" 
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          ) : (
            <Button className="rounded-full w-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
              <Link to="/join">Log In</Link>
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileSidebar;
