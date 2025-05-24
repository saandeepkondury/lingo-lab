
import { Card, CardContent } from '@/components/ui/card';

const FundingTab = () => {
  return (
    <div className="prose prose-indigo dark:prose-invert max-w-none">
      <h2 className="text-2xl font-semibold mb-6">Funding Journey</h2>
      
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Series H</h3>
                <p className="text-gray-600 dark:text-gray-300">March 2021</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">$600M</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">$95B valuation</p>
              </div>
            </div>
            <p className="text-sm mb-3">
              <strong>Lead Investors:</strong> Allianz X, Axa, Baillie Gifford, Fidelity Management
            </p>
            <p className="text-sm">
              This round solidified Stripe's position as financial infrastructure for the internet, 
              with funds allocated to global expansion and product development.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Series G</h3>
                <p className="text-gray-600 dark:text-gray-300">April 2020</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">$600M</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">$36B valuation</p>
              </div>
            </div>
            <p className="text-sm mb-3">
              <strong>Lead Investors:</strong> Andreessen Horowitz, General Catalyst, Sequoia Capital
            </p>
            <p className="text-sm">
              Raised during the pandemic to capitalize on the shift to digital commerce and 
              expand Stripe's infrastructure offerings globally.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold">Earlier Rounds</h3>
                <p className="text-gray-600 dark:text-gray-300">2011-2019</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">$1.6B+</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total raised</p>
              </div>
            </div>
            <p className="text-sm">
              Series A through F with notable investors including Sequoia Capital, Andreessen Horowitz, 
              Thrive Capital, and General Catalyst, building from payments to full financial infrastructure.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 mt-8">Funding Strategy Impact</h3>
      <p className="mb-4">
        Stripe's "financial infrastructure" narrative was crucial in achieving premium valuations typically 
        reserved for software companies rather than traditional financial services. This positioning 
        allowed them to command SaaS-like multiples rather than fintech multiples.
      </p>
    </div>
  );
};

export default FundingTab;
