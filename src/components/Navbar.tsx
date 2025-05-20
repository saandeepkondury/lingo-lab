
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-coral-500 bg-clip-text text-transparent">Lingo<span className="text-teal-500">Lab</span></span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/case-studies" className="transition-colors hover:text-teal-600">Case Studies</Link>
            <Link to="/pricing" className="transition-colors hover:text-teal-600">Pricing</Link>
            <Link to="/submit" className="transition-colors hover:text-teal-600">Submit Lingo</Link>
            <Link to="/newsletter" className="transition-colors hover:text-teal-600">Newsletter</Link>
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex">
            <Button variant="outline" size="icon" className="rounded-full mr-2" asChild>
              <Link to="/case-studies" aria-label="Search">
                <Search className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" className="rounded-full" asChild>
              
            </Button>
            <Button className="rounded-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
              <Link to="/join">Join Now</Link>
            </Button>
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden fixed inset-0 top-16 z-50 bg-background animate-fade-in">
          <nav className="container py-8 flex flex-col space-y-6 text-lg font-medium">
            <Link to="/" className="hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/case-studies" className="hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Case Studies</Link>
            <Link to="/pricing" className="hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link to="/submit" className="hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Submit Lingo</Link>
            <Link to="/newsletter" className="hover:text-teal-600" onClick={() => setIsMenuOpen(false)}>Newsletter</Link>
            
            <div className="flex space-x-4 py-4">
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <Link to="/case-studies" aria-label="Search" onClick={() => setIsMenuOpen(false)}>
                  <Search className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="rounded-full w-full" asChild>
                <Link to="/join" onClick={() => setIsMenuOpen(false)}>Log In</Link>
              </Button>
              <Button className="rounded-full w-full bg-teal-500 hover:bg-teal-600 text-white" asChild>
                <Link to="/join" onClick={() => setIsMenuOpen(false)}>Join Now</Link>
              </Button>
            </div>
          </nav>
        </div>}
    </header>;
};

export default Navbar;
