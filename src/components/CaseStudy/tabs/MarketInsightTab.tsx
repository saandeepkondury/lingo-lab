
import { Card, CardContent } from '@/components/ui/card';

const MarketInsightTab = () => {
  return (
    <div className="prose prose-indigo dark:prose-invert max-w-none">
      <h2 className="text-2xl font-semibold mb-6">Market Insight & Architecture</h2>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Market Opportunity</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>$1.3T global payments market</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Growing developer economy</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>API-first business models</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>Global digital transformation</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Competitive Landscape</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Legacy payment processors</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>PayPal ecosystem dominance</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                <span>Square's SMB focus</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                <span>Banking-as-a-Service emergence</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Architecture Philosophy</h3>
      <p className="mb-4">
        Stripe's technology stack reflects their "infrastructure" narrative. Rather than building a monolithic 
        payments processor, they've created a distributed system of microservices that can be composed 
        to solve different financial problems.
      </p>
      
      <p className="mb-4">
        This architectural approach reinforces their positioning as infrastructure rather than a simple 
        payment gateway - it's designed to be the foundation other companies build on top of.
      </p>
      
      <h3 className="text-xl font-semibold mb-4 mt-8">Market Dynamics</h3>
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">Developer-First Movement</h4>
          <p className="text-sm">
            The rise of developer-centric tools and API-first companies created the perfect market 
            conditions for Stripe's infrastructure narrative to resonate.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">Digital Commerce Explosion</h4>
          <p className="text-sm">
            E-commerce growth, especially accelerated by COVID-19, validated the need for 
            programmable financial infrastructure beyond simple payment processing.
          </p>
        </div>
        
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-semibold mb-2">Fintech Unbundling</h4>
          <p className="text-sm">
            Traditional financial services being disaggregated into specialized, API-accessible 
            components that can be reassembled into new experiences.
          </p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4 mt-8">TAM Expansion Strategy</h3>
      <p className="mb-4">
        By positioning as "financial infrastructure," Stripe expanded their total addressable market 
        from payments (~$50B) to the entire global financial services infrastructure (~$1.3T+).
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Banking services (Treasury, Issuing)</li>
        <li>Business operations (Atlas, Tax)</li>
        <li>Fraud prevention and risk management</li>
        <li>Financial reporting and analytics</li>
        <li>International expansion tools</li>
      </ul>
    </div>
  );
};

export default MarketInsightTab;
