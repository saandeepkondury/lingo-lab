
import { Button } from '@/components/ui/button';
import CompanyCard from '@/components/CompanyCard';

interface CompaniesListProps {
  companies: Array<{
    id: string;
    name: string;
    logo: string;
    description: string;
    industry: string;
    founded: number;
    caseStudies: string[];
  }>;
  clearFilters: () => void;
}

const CompaniesList = ({ 
  companies, 
  clearFilters 
}: CompaniesListProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {companies.length > 0 ? (
        <>
          {companies.map((company) => (
            <CompanyCard key={company.id} {...company} />
          ))}
        </>
      ) : (
        <div className="col-span-2 py-20 text-center">
          <p className="text-lg text-muted-foreground">No companies found matching your filters</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={clearFilters}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default CompaniesList;
