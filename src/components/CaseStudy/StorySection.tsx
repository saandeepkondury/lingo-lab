
import { BookOpen, Lightbulb, Target } from 'lucide-react';

interface StorySectionProps {
  narrative: any;
}

const StorySection = ({ narrative }: StorySectionProps) => {
  return (
    <div className="container max-w-4xl mx-auto px-6 py-12 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <BookOpen className="h-6 w-6 text-teal-600" />
          <span className="text-sm font-medium text-teal-600 uppercase tracking-wide">Origin Story</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          How It All Started
        </h2>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">The Insight</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {narrative.lingo_evolution || `${narrative.company} started with a simple observation: the internet needed better economic infrastructure. What began as a payment processing company evolved into something much bigger.`}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">The Strategy</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {narrative.why_it_worked || `The phrase "${narrative.key_phrase}" became central to how the market understood the category. It wasn't just about payments - it was about building the fundamental infrastructure that powers digital commerce.`}
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-950/50 dark:to-blue-950/50 p-6 rounded-xl border border-teal-200 dark:border-teal-800">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              This narrative shift helped {narrative.company} attract top talent, secure major partnerships, and eventually become one of the most valuable fintech companies in the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
