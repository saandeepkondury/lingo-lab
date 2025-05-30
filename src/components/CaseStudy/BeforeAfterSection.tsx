
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BeforeAfterSectionProps {
  narrative: any;
}

const BeforeAfterSection = ({ narrative }: BeforeAfterSectionProps) => {
  const beforeAfter = narrative.before_after_positioning || { 
    before: 'Complex, fragmented payment systems', 
    after: 'Unified economic infrastructure' 
  };

  return (
    <div className="container max-w-4xl mx-auto px-6 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Before:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                {beforeAfter.before}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">After:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
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
