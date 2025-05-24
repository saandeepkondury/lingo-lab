
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const DiscussionSection = () => {
  return (
    <section className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold dark:text-white">Discussion</h2>
        <span className="text-muted-foreground">2 comments</span>
      </div>
      
      <div className="p-6 border border-border rounded-xl dark:border-gray-700">
        <div className="flex items-center space-x-4 mb-4">
          <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Add Comment</span>
          </Button>
          <p className="text-sm text-muted-foreground">Login to join the conversation</p>
        </div>
        
        <div className="space-y-6">
          <div className="p-4 bg-muted/30 dark:bg-gray-800/50 rounded-lg">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-200 font-semibold text-sm">JD</span>
                </div>
                <span className="font-medium dark:text-white">Jane Doe</span>
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <p className="mt-2 text-sm dark:text-gray-300">
              This case study was incredibly insightful. We're currently repositioning our fintech product and the narrative architecture breakdown is exactly what we needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscussionSection;
