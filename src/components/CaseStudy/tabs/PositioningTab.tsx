
import { Card, CardContent } from '@/components/ui/card';

const PositioningTab = () => {
  return (
    <div className="prose prose-indigo dark:prose-invert max-w-none">
      <h2 className="text-2xl font-semibold mb-6">Strategic Positioning</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-600">Before: "Payments Company"</h3>
            <ul className="space-y-2 text-sm">
              <li>• Commoditized service perception</li>
              <li>• Limited to transaction processing</li>
              <li>• Competing on pricing and features</li>
              <li>• Traditional fintech multiples</li>
              <li>• Single product category</li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-600">After: "Financial Infrastructure"</h3>
            <ul className="space-y-2 text-sm">
              <li>• Essential platform positioning</li>
              <li>• Expanded total addressable market</li>
              <li>• Platform strategy opportunities</li>
              <li>• SaaS-like valuation multiples</li>
              <li>• Multiple product categories</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Competitive Differentiation</h3>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">vs. PayPal</h4>
          <p className="text-sm">
            While PayPal focused on consumer wallets and marketplace payments, Stripe positioned 
            as developer-first infrastructure for building custom financial experiences.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">vs. Square</h4>
          <p className="text-sm">
            Square targeted physical retail with hardware-software bundles, while Stripe became 
            the invisible infrastructure powering online businesses globally.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">vs. Traditional Processors</h4>
          <p className="text-sm">
            Legacy processors offered basic transaction services, while Stripe provided 
            programmable financial infrastructure with modern APIs and developer experience.
          </p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 mt-8">Market Creation Impact</h3>
      <p className="mb-4">
        By positioning as "financial infrastructure," Stripe didn't just compete in the existing 
        payments market - they created an entirely new category. This allowed them to:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Set category definitions and standards</li>
        <li>Attract talent wanting to build "infrastructure"</li>
        <li>Justify premium pricing for platform capabilities</li>
        <li>Expand into adjacent financial services naturally</li>
        <li>Partner with other infrastructure companies (AWS, etc.)</li>
      </ul>
    </div>
  );
};

export default PositioningTab;
