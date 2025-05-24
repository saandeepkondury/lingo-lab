
import Layout from '@/components/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCaseStudies from '@/components/home/FeaturedCaseStudies';
import ValueProposition from '@/components/home/ValueProposition';
import CTASection from '@/components/home/CTASection';
import FiltersPanel from '@/components/FiltersPanel';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { filterGroups } from '@/data/companiesData';
import { useCaseStudiesFilter } from '@/hooks/useCaseStudiesFilter';
import SearchArea from '@/components/CaseStudies/SearchArea';
import CaseStudiesList from '@/components/CaseStudies/CaseStudiesList';
import { Link } from 'react-router-dom';

const Index = () => {
  const { isLoggedIn } = useAuth();
  const { subscribed } = useSubscription();
  const { toast } = useToast();
  
  // Always call hooks at the top level - move this outside the conditional
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    visibleCaseStudies,
    lockedCaseStudies
  } = useCaseStudiesFilter();
  
  const hasPaidAccess = isLoggedIn && subscribed;
  
  const handleLockedCaseStudyClick = () => {
    toast({
      title: "Premium Case Study",
      description: "Subscribe to access our full library of case studies.",
      action: <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild><Link to="/pricing">View Plans</Link></Button>
    });
  };

  // If user is logged in, show case studies page
  if (isLoggedIn) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-semibold mb-4">Case Study Library</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore how the world's most successful startups used strategic narrative to drive growth
              </p>
              {!hasPaidAccess && (
                <div className="mt-4">
                  <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                    <Link to="/pricing">Upgrade to Unlock All Case Studies</Link>
                  </Button>
                </div>
              )}
            </div>
            
            <div className="relative flex flex-col md:flex-row gap-8">
              {/* Filters - shown as sidebar on desktop, drawer on mobile */}
              <div className="md:w-64 flex-shrink-0">
                <div className="md:sticky md:top-20">
                  <FiltersPanel filters={filterGroups} activeFilters={activeFilters} onFilterChange={handleFilterChange} clearFilters={clearFilters} />
                </div>
              </div>
              
              {/* Main content */}
              <div className="flex-1">
                {/* Search area */}
                <SearchArea searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                
                {/* Results count */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {visibleCaseStudies.length} case studies
                    {lockedCaseStudies.length > 0 && ` (${lockedCaseStudies.length} locked)`}
                  </p>
                </div>
                
                {/* Results grid */}
                <CaseStudiesList visibleCaseStudies={visibleCaseStudies} lockedCaseStudies={lockedCaseStudies} handleLockedCaseStudyClick={handleLockedCaseStudyClick} clearFilters={clearFilters} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // If user is not logged in, show original homepage
  return (
    <Layout>
      <HeroSection />
      <FeaturedCaseStudies />
      <ValueProposition />
      <CTASection />
    </Layout>
  );
};

export default Index;
