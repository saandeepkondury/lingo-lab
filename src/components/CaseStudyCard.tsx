
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface CaseStudyCardProps {
  id: string;
  company: string;
  lingo: string;
  impact: string;
  rating?: number;
  narrativeType: string;
  industry: string;
}

const CaseStudyCard = ({
  id,
  company,
  lingo,
  impact,
  rating,
  narrativeType,
  industry
}: CaseStudyCardProps) => {
  return (
    <Link to={`/case-studies/${id}`} className="block">
      <div className="apple-card h-full p-6 hover-scale">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">{company}</h3>
          {rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-3 mb-6">
          <p className="text-2xl font-medium text-primary">"{lingo}"</p>
          <p className="text-sm text-muted-foreground">{impact}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-muted/50 hover:bg-muted">
            {narrativeType}
          </Badge>
          <Badge variant="outline" className="bg-muted/50 hover:bg-muted">
            {industry}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;
