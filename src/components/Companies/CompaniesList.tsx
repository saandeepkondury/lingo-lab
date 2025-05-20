
import { Link } from 'react-router-dom';
import CompanyCard from '@/components/CompanyCard';

interface CompaniesListProps {
  companies: {
    id: string;
    name: string;
    logo: string;
    description: string;
    industry: string;
    founded: number;
    caseStudies: string[];
  }[];
}

const CompaniesList = ({ companies }: CompaniesListProps) => {
  if (companies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground mb-4">No companies found</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {companies.map((company) => (
        <Link to={`/companies/${company.id}`} key={company.id} className="block">
          <CompanyCard 
            name={company.name}
            description={company.description}
            logo={company.logo}
            industry={company.industry}
            studies={company.caseStudies.length}
          />
        </Link>
      ))}
    </div>
  );
};

export default CompaniesList;
