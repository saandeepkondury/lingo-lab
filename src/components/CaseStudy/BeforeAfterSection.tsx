
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

interface BeforeAfterSectionProps {
  narrative: any;
}

const BeforeAfterSection = ({ narrative }: BeforeAfterSectionProps) => {
  const beforeAfter = narrative.before_after_positioning || { 
    before: 'Complex, fragmented payment systems', 
    after: 'Unified economic infrastructure' 
  };

  return (
    <div className="container max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          The Transformation
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          How {narrative.company} redefined their market position
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Card className="border-2 border-red-100 dark:border-red-900/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertCircle className="h-5 w-5" />
              Before:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-200 dark:border-red-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                {beforeAfter.before}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Arrow connector */}
        <div className="flex justify-center md:justify-start">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <ArrowRight className="h-8 w-8 text-white" />
          </div>
        </div>

        <Card className="border-2 border-green-100 dark:border-green-900/30 shadow-lg hover:shadow-xl transition-shadow duration-300 md:-ml-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
              After:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                {beforeAfter.after}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BeforeAfterSection;
