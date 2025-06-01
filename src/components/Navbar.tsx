
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-serif font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Lingo<span className="text-emerald-500">Lab</span>
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          
          <div className="flex space-x-2">
            <Button className="rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white" asChild>
              <Link to="/#newsletter">Join Newsletter</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
