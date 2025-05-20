
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border bg-background py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-coral-500 bg-clip-text text-transparent">Lingo<span className="text-teal-500">Library</span></span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Discover how top founders used strategic narrative to raise millions and shape markets.
          </p>
        </div>
        
        <div>
          <h4 className="mb-4 text-sm font-semibold">Pages</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
            <li><Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link to="/newsletter" className="text-muted-foreground hover:text-foreground transition-colors">Newsletter</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="mb-4 text-sm font-semibold">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/submit" className="text-muted-foreground hover:text-foreground transition-colors">Submit a Lingo</Link></li>
            <li><Link to="/founders" className="text-muted-foreground hover:text-foreground transition-colors">Founder Interviews</Link></li>
            <li><Link to="/library" className="text-muted-foreground hover:text-foreground transition-colors">Your Library</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="mb-4 text-sm font-semibold">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {currentYear} Lingo Library. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="#" className="text-muted-foreground hover:text-foreground">Twitter</Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground">LinkedIn</Link>
          <Link to="#" className="text-muted-foreground hover:text-foreground">Instagram</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
