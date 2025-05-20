
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

interface CaseStudyCardProps {
  id: string;
  company: string;
  companyName: string;
  lingo: string;
  impact: string;
  rating?: number;
  narrativeType: string;
  industry: string;
  year?: number;
}

const CaseStudyCard = ({
  id,
  company,
  companyName,
  lingo,
  impact,
  narrativeType,
  industry,
  year
}: CaseStudyCardProps) => {
  return (
    <Link to={`/case-studies/${id}`} className="block">
      <div className="apple-card h-full p-6 hover-scale border-t-4 border-t-teal-500 transition-all duration-300">
        <div className="flex justify-between items-start mb-4">
          <Link 
            to={`/companies/${company}`} 
            className="text-lg font-semibold hover:text-teal-600"
            onClick={(e) => e.stopPropagation()}
          >
            {companyName}
          </Link>
          {year && <span className="text-sm text-muted-foreground">{year}</span>}
        </div>
        
        <div className="space-y-3 mb-6">
          <p className="text-2xl font-medium text-teal-600 drop-shadow-sm">"{lingo}"</p>
          <p className="text-sm text-muted-foreground">{impact}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200">
            {narrativeType}
          </Badge>
          <Badge variant="outline" className="bg-coral-50 text-coral-700 hover:bg-coral-100 border-coral-200">
            {industry}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
