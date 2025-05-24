
import { Button } from '@/components/ui/button';
import { BookmarkPlus, BookmarkCheck } from 'lucide-react';
import ShareOptions from '@/components/ShareOptions';

interface CaseStudyAuthorCardProps {
  caseStudy: any;
  slug?: string;
  isSaved: boolean;
  onSaveToggle: () => void;
}

const CaseStudyAuthorCard = ({ caseStudy, slug, isSaved, onSaveToggle }: CaseStudyAuthorCardProps) => {
  return (
    <div className="bg-indigo-100 dark:bg-indigo-900/70 rounded-lg p-6 mb-10">
      <div className="flex items-start justify-between">
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-indigo-200 dark:bg-indigo-800 overflow-hidden">
              <img 
                src={caseStudy.author?.image || "/placeholder.svg"} 
                alt={caseStudy.author?.name || "Author"} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg dark:text-white">{caseStudy.author?.name || "LingoLab Team"}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{caseStudy.author?.role || "Narrative Analyst"}</p>
            {caseStudy.author?.twitter && (
              <a href="#" className="text-indigo-600 dark:text-indigo-300 text-sm flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                {caseStudy.author?.twitter}
              </a>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="hidden md:flex space-x-8 text-center">
          <div>
            <p className="text-xl font-bold dark:text-white">{caseStudy.metrics?.revenue || caseStudy.overview.revenue}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">REVENUE</p>
          </div>
          <div>
            <p className="text-xl font-bold dark:text-white">{caseStudy.metrics?.founders || "1"}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">FOUNDERS</p>
          </div>
          <div>
            <p className="text-xl font-bold dark:text-white">{caseStudy.metrics?.employees || caseStudy.overview.employees}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">EMPLOYEES</p>
          </div>
        </div>
      </div>

      {/* Social buttons */}
      <div className="flex justify-end mt-4 space-x-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center space-x-1 bg-white dark:bg-gray-800"
          onClick={onSaveToggle}
        >
          {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </Button>
        
        <ShareOptions 
          caseStudy={{
            company: caseStudy.company,
            lingo: caseStudy.lingo,
            id: slug || ''
          }}
        />
      </div>
    </div>
  );
};

export default CaseStudyAuthorCard;
