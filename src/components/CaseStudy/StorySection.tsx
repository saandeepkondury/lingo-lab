
interface StorySectionProps {
  narrative: any;
}

const StorySection = ({ narrative }: StorySectionProps) => {
  return (
    <div className="container max-w-4xl mx-auto px-6 py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-6">Story:</h2>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {narrative.lingo_evolution || `${narrative.company} started with a simple observation: the internet needed better economic infrastructure. What began as a payment processing company evolved into something much bigger.`}
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {narrative.why_it_worked || `The phrase "${narrative.key_phrase}" became central to how the market understood the category. It wasn't just about payments - it was about building the fundamental infrastructure that powers digital commerce.`}
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            This narrative shift helped {narrative.company} attract top talent, secure major partnerships, and eventually become one of the most valuable fintech companies in the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorySection;
