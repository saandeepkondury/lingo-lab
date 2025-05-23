
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import FiltersPanel from '@/components/FiltersPanel';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { filterGroups } from '@/data/companiesData';
import { useCaseStudiesFilter } from '@/hooks/useCaseStudiesFilter';
import SearchArea from '@/components/CaseStudies/SearchArea';
import CaseStudiesList from '@/components/CaseStudies/CaseStudiesList';
import { Bookmark } from 'lucide-react';

const CaseStudies = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    visibleCaseStudies,
    lockedCaseStudies
  } = useCaseStudiesFilter();
  const {
    isLoggedIn
  } = useAuth();
  const {
    toast
  } = useToast();
  const handleLockedCaseStudyClick = () => {
    toast({
      title: "Premium Case Study",
      description: "Subscribe to access our full library of case studies.",
      action: <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild><Link to="/pricing">View Plans</Link></Button>
    });
  };
  return <Layout>
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4">Case Study Library</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore how the world's most successful startups used strategic narrative to drive growth
            </p>
            <div className="mt-4 flex justify-center gap-3">
              {!isLoggedIn && (
                <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                  <Link to="/join">Join to Unlock All Case Studies</Link>
                </Button>
              )}
              {isLoggedIn && (
                <Button variant="outline" asChild>
                  <Link to="/saved">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Saved Case Studies
                  </Link>
                </Button>
              )}
            </div>
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
                  {!isLoggedIn && lockedCaseStudies.length > 0 && ` (${lockedCaseStudies.length} locked)`}
                </p>
              </div>
              
              {/* Results grid */}
              <CaseStudiesList visibleCaseStudies={visibleCaseStudies} lockedCaseStudies={lockedCaseStudies} handleLockedCaseStudyClick={handleLockedCaseStudyClick} clearFilters={clearFilters} />
            </div>
          </div>
        </div>
      </section>
    </Layout>;
};
export default CaseStudies;
