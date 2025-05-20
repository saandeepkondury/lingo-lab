
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Building2 } from 'lucide-react';
import CaseStudyCard from '@/components/CaseStudyCard';
import LockedCaseStudy from '@/components/CaseStudies/LockedCaseStudy';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { allCompanies } from '@/data/companiesData';
import { useCaseStudiesFilter } from '@/hooks/useCaseStudiesFilter';
import FiltersPanel from '@/components/FiltersPanel';
import { filterGroups } from '@/data/companiesData';
import SearchArea from '@/components/CaseStudies/SearchArea';

const CompanyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const company = allCompanies.find(c => c.id === slug);
  const { isLoggedIn } = useAuth();
  const { toast } = useToast();
  
  const { 
    searchQuery, 
    setSearchQuery, 
    activeFilters, 
    handleFilterChange,
    clearFilters,
    visibleCaseStudies, 
    lockedCaseStudies 
  } = useCaseStudiesFilter(slug);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [slug]);
  
  const handleLockedCaseStudyClick = () => {
    toast({
      title: "Premium Case Study",
      description: "Subscribe to access our full library of case studies.",
      action: <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild><Link to="/pricing">View Plans</Link></Button>
    });
  };
  
  if (!company) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Company not found</h1>
            <p className="mb-8">The company you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/companies">Back to Companies</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-muted-foreground">
              <Link to="/companies" className="hover:text-foreground">Companies</Link>
              <span className="mx-2">/</span>
              <span>{company.name}</span>
            </div>
          </div>
          
          {/* Company Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start mb-12">
            <div className="h-24 w-24 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
              <Building2 className="h-12 w-12 text-indigo-600" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{company.name}</h1>
              <p className="text-lg text-muted-foreground mb-4">{company.description}</p>
              
              <div className="flex flex-wrap gap-6 text-sm mb-4">
                <div>
                  <span className="font-semibold block">Founded</span>
                  <span>{company.founded}</span>
                </div>
                <div>
                  <span className="font-semibold block">Industry</span>
                  <span>{company.industry}</span>
                </div>
                <div>
                  <span className="font-semibold block">Lingo Case Studies</span>
                  <span>{company.caseStudies.length}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
                  {company.industry}
                </Badge>
              </div>
            </div>
          </div>
          
          <Separator className="mb-12" />
          
          <h2 className="text-2xl font-semibold mb-8">Lingo Case Studies</h2>
          
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* Filters - shown as sidebar on desktop, drawer on mobile */}
            <div className="md:w-64 flex-shrink-0">
              <div className="md:sticky md:top-20">
                <FiltersPanel 
                  filters={filterGroups.filter(g => g.name !== "Industry")} // Remove industry filter since we're already on a company page
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  clearFilters={clearFilters}
                />
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {/* Search area */}
              <SearchArea 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              
              {/* Results count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {visibleCaseStudies.length} case studies
                  {!isLoggedIn && lockedCaseStudies.length > 0 && ` (${lockedCaseStudies.length} locked)`}
                </p>
              </div>
              
              {/* Results grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {visibleCaseStudies.length > 0 ? (
                  <>
                    {visibleCaseStudies.map((study) => (
                      <CaseStudyCard key={study.id} {...study} />
                    ))}
                    
                    {/* Locked case studies */}
                    {lockedCaseStudies.map((study) => (
                      <LockedCaseStudy 
                        key={study.id}
                        study={study}
                        onClick={handleLockedCaseStudyClick}
                      />
                    ))}
                  </>
                ) : (
                  <div className="col-span-2 py-20 text-center">
                    <p className="text-lg text-muted-foreground">No case studies found matching your filters</p>
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
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyDetail;
