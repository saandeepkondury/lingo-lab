
import { Play } from 'lucide-react';

const VideoTab = () => {
  return (
    <div className="prose prose-indigo dark:prose-invert max-w-none">
      <h2 className="text-2xl font-semibold mb-6">Video Analysis</h2>
      
      <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6">
        <div className="text-center">
          <Play className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Video content coming soon</p>
          <p className="text-sm text-gray-400 mt-2">Deep dive into Stripe's narrative evolution</p>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold mb-4">Key Video Moments</h3>
      <ul className="space-y-3">
        <li className="flex items-start space-x-3">
          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-sm font-mono">2:34</span>
          <span>Patrick Collison explains the infrastructure metaphor</span>
        </li>
        <li className="flex items-start space-x-3">
          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-sm font-mono">5:12</span>
          <span>AWS comparison and platform strategy</span>
        </li>
        <li className="flex items-start space-x-3">
          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded text-sm font-mono">8:45</span>
          <span>Impact on product development roadmap</span>
        </li>
      </ul>
    </div>
  );
};

export default VideoTab;
