
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Building } from 'lucide-react';

interface CompanyCardProps {
  id?: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  founded?: number;
  caseStudies?: string[];
  studies?: number;
}

const CompanyCard = ({
  id,
  name,
  description,
  industry,
  founded,
  caseStudies,
  studies
}: CompanyCardProps) => {
  return (
    <div className="apple-card h-full p-6 hover-scale border-t-4 border-t-indigo-500 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
            <Building className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <p className="text-sm text-muted-foreground">{description}</p>
        {founded && (
          <div className="flex items-center space-x-1 text-sm">
            <span className="font-medium">Founded:</span>
            <span>{founded}</span>
          </div>
        )}
        <div className="flex items-center space-x-1 text-sm">
          <span className="font-medium">Lingo Case Studies:</span>
          <span>{studies || (caseStudies ? caseStudies.length : 0)}</span>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
          {industry}
        </Badge>
      </div>
    </div>
  );
}

export default CompanyCard;
