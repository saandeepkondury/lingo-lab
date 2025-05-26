
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react';

interface NarrativeEvolutionTimelineProps {
  caseStudy: any;
}

const NarrativeEvolutionTimeline = ({ caseStudy }: NarrativeEvolutionTimelineProps) => {
  const evolutionSteps = [
    {
      year: "2010",
      phase: "Foundation",
      narrative: "Online Payments",
      description: "Simple payment processing API for developers",
      metrics: "API-first approach",
      impact: "Developer adoption"
    },
    {
      year: "2016",
      phase: "Expansion",
      narrative: "Payment Platform",
      description: "Expanded beyond basic processing to comprehensive payment solutions",
      metrics: "Global expansion",
      impact: "Enterprise customers"
    },
    {
      year: "2018",
      phase: "Repositioning",
      narrative: "Financial Infrastructure",
      description: "Strategic pivot to positioning as essential business infrastructure",
      metrics: "$20B valuation",
      impact: "Market category creation"
    },
    {
      year: "2021",
      phase: "Dominance",
      narrative: "Economic Infrastructure",
      description: "Evolved to become the backbone of internet economy",
      metrics: "$95B valuation",
      impact: "Industry standard"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-500" />
          Narrative Evolution Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-teal-500 via-indigo-500 to-purple-500"></div>
          
          <div className="space-y-8">
            {evolutionSteps.map((step, index) => (
              <div key={index} className="relative flex items-start gap-6">
                {/* Timeline Dot */}
                <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-teal-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.year.slice(-2)}
                </div>
                
                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge className="mb-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {step.phase}
                        </Badge>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                          "{step.narrative}"
                        </h4>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Impact</div>
                        <div className="font-medium text-teal-600 dark:text-teal-400">{step.impact}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{step.description}</p>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{step.metrics}</span>
                    </div>
                  </div>
                </div>
                
                {/* Arrow for connection */}
                {index < evolutionSteps.length - 1 && (
                  <div className="absolute left-8 top-20 z-10">
                    <ArrowRight className="h-4 w-4 text-gray-400 transform rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NarrativeEvolutionTimeline;
