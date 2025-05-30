
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import FiltersPanel from '@/components/FiltersPanel';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { filterGroups } from '@/data/companiesData';
import { useCaseStudiesFilter } from '@/hooks/useCaseStudiesFilter';
import SearchArea from '@/components/CaseStudies/SearchArea';
import CaseStudiesList from '@/components/CaseStudies/CaseStudiesList';

const CompanyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    caseStudies,
    isLoading
  } = useCaseStudiesFilter(slug);
  const {
    isLoggedIn,
    isLoading: authLoading
  } = useAuth();
  const {
    toast
  } = useToast();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, authLoading, navigate]);

  // Show loading state while checking auth or loading data
  if (authLoading || isLoading) {
    return <Layout>
        <section className="py-12">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">Loading...</p>
            </div>
          </div>
        </section>
      </Layout>;
  }

  // Don't render anything if not logged in (will redirect)
  if (!isLoggedIn) {
    return null;
  }

  const companyName = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Company';

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/case-studies')}
              className="mb-4 -ml-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
            <h1 className="text-4xl font-semibold mb-4">{companyName} Case Studies</h1>
            <p className="text-lg text-muted-foreground">
              Explore strategic narratives and positioning strategies from {companyName}
            </p>
          </div>
          
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* Filters - shown as sidebar on desktop, drawer on mobile */}
            <div className="md:w-64 flex-shrink-0">
              <div className="md:sticky md:top-20">
                <FiltersPanel 
                  filters={filterGroups} 
                  activeFilters={activeFilters} 
                  onFilterChange={handleFilterChange} 
                  clearFilters={clearFilters} 
                />
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1">
              {/* Search area */}
              <SearchArea searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              
              {/* Results count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {caseStudies.length} case studies for {companyName}
                </p>
              </div>
              
              {/* Results grid */}
              <CaseStudiesList 
                caseStudies={caseStudies} 
                clearFilters={clearFilters} 
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyDetail;
