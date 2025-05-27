
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import { useSubscription } from '@/hooks/useSubscription';
import SEOHead from '@/components/SEOHead';

const CaseStudies = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    visibleCaseStudies,
    lockedCaseStudies,
    isLoading
  } = useCaseStudiesFilter();
  const {
    isLoggedIn,
    isLoading: authLoading
  } = useAuth();
  const {
    subscribed,
    loading
  } = useSubscription();
  const {
    toast
  } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect to home if not logged in
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, authLoading, navigate]);

  // Check if user just signed in/up and show appropriate message
  useEffect(() => {
    if (location.state?.justSignedUp) {
      toast({
        title: "Welcome to LingoLab!",
        description: "You can see a preview of our case studies. Subscribe to unlock them all!",
        action: <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild>
            <Link to="/pricing">View Plans</Link>
          </Button>
      });
    } else if (location.state?.justSignedIn) {
      toast({
        title: "Welcome back!",
        description: subscribed ? "Enjoy full access to our case study library." : "Subscribe to unlock our full case study library."
      });
    }
  }, [location.state, toast, subscribed]);

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

  // Show loading state while checking subscription
  if (loading) {
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

  // Use actual subscription status instead of random demo logic
  const isPaidUser = subscribed;
  const displayVisibleCaseStudies = isPaidUser ? visibleCaseStudies : visibleCaseStudies.slice(0, 2);
  const displayLockedCaseStudies = isPaidUser ? [] : [...visibleCaseStudies.slice(2), ...lockedCaseStudies];
  
  const handleLockedCaseStudyClick = () => {
    toast({
      title: "Premium Case Study",
      description: "Subscribe to access our full library of case studies.",
      action: <Button className="bg-teal-500 hover:bg-teal-600 text-white" size="sm" asChild>
          <Link to="/pricing">View Plans</Link>
        </Button>
    });
  };

  return (
    <Layout>
      <SEOHead
        title="Strategic Narrative Case Studies | LingoLab"
        description="Explore how the world's most successful startups used strategic narrative to drive growth. Learn from Stripe, Notion, Figma and more."
        keywords="strategic narrative, case studies, startup growth, positioning, market creation, fintech, saas"
        canonicalUrl={`${window.location.origin}/case-studies`}
        type="website"
      />
      
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4">Case Study Library</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore how the world's most successful startups used strategic narrative to drive growth
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
              {!isPaidUser && (
                <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                  <Link to="/pricing">Upgrade to Unlock All Case Studies</Link>
                </Button>
              )}
              <Button variant="outline" className="flex items-center gap-2" asChild>
                <Link to="/saved">
                  <Bookmark className="h-4 w-4" />
                  Saved Case Studies
                </Link>
              </Button>
            </div>
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
                  Showing {displayVisibleCaseStudies.length + displayLockedCaseStudies.length} case studies
                  {displayLockedCaseStudies.length > 0 && ` (${displayLockedCaseStudies.length} locked)`}
                </p>
              </div>
              
              {/* Results grid */}
              <CaseStudiesList 
                visibleCaseStudies={displayVisibleCaseStudies} 
                lockedCaseStudies={displayLockedCaseStudies} 
                handleLockedCaseStudyClick={handleLockedCaseStudyClick} 
                clearFilters={clearFilters} 
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CaseStudies;
