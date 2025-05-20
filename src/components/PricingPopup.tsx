
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface PricingPopupProps {
  threshold?: number; // Percentage of page scrolled before showing popup
  forceShow?: boolean; // For cases where we want to show it immediately (like in locked sections)
}

const PricingPopup = ({ threshold = 60, forceShow = false }: PricingPopupProps) => {
  const [isVisible, setIsVisible] = useState(forceShow);
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has already dismissed the popup recently
    const popupDismissed = localStorage.getItem('pricingPopupDismissed');
    if (popupDismissed && Date.now() - parseInt(popupDismissed) < 24 * 60 * 60 * 1000) {
      // If popup was dismissed less than 24 hours ago
      return;
    }

    // If forceShow is true, show the popup immediately
    if (forceShow) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      // Show popup when user scrolls past the threshold
      if (scrollPercent > threshold && !dismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, dismissed, forceShow]);

  // If forceShow changes to true, update isVisible
  useEffect(() => {
    if (forceShow) {
      setIsVisible(true);
    }
  }, [forceShow]);

  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    localStorage.setItem('pricingPopupDismissed', Date.now().toString());
  };

  const handleViewPricing = () => {
    navigate('/pricing');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md z-50 bg-background border rounded-lg shadow-lg p-5 animate-fade-in">
      <button 
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
      >
        <X size={18} />
      </button>
      <div className="text-center">
        <h3 className="text-lg font-bold mb-2">Enjoying this article?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Join our premium community for unlimited access to all case studies and exclusive content.
        </p>
        <div className="flex justify-center space-x-3">
          <Button 
            onClick={handleViewPricing}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            See Pricing Plans
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDismiss}
          >
            Not Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingPopup;
