
import { Button } from '@/components/ui/button';

const PricingSection = () => {
  const tiers = [
    {
      name: "Solo Sprint",
      price: "$2,000",
      description: "Seed-stage founder with traction",
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "VC-Backed Sprint", 
      price: "$5,000",
      description: "Series A+ or funded startups",
      color: "from-emerald-500 to-teal-600",
      popular: true
    },
    {
      name: "Lingo Scout Pass",
      price: "$0",
      description: "Invite-only founders we're watching closely",
      color: "from-purple-500 to-violet-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-950">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 px-6 py-3 rounded-full mb-8">
            <span className="text-2xl">💸</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Pricing</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div key={index} className={`relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 ${tier.popular ? 'border-emerald-500 transform scale-105' : 'border-gray-200 dark:border-gray-700'}`}>
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{tier.name}</h3>
                <div className={`text-4xl font-bold bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-4`}>
                  {tier.price}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{tier.description}</p>
                
                <Button className={`w-full bg-gradient-to-r ${tier.color} hover:opacity-90 text-white font-semibold py-3`}>
                  {tier.price === "$0" ? "Apply Now" : "Get Started"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
