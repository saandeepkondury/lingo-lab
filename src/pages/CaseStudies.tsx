
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
import { Bookmark, Search } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import SEOHead from '@/components/SEOHead';

const CaseStudies = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    handleFilterChange,
    clearFilters,
    caseStudies,
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
        description: "You're now part of our community of strategic founders. Explore success stories from VC-backed companies.",
        action: <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white" size="sm" asChild>
            <Link to="/pricing">Unlock Premium</Link>
          </Button>
      });
    } else if (location.state?.justSignedIn) {
      toast({
        title: "Welcome back!",
        description: subscribed ? "Continue exploring strategic narratives with unlimited access." : "Ready to unlock premium strategic insights?"
      });
    }
  }, [location.state, toast, subscribed]);

  // Show loading state while checking auth or loading data
  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950">
          <section className="py-12">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-gradient-to-r from-teal-200 to-blue-200 rounded-lg w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  // Don't render anything if not logged in (will redirect)
  if (!isLoggedIn) {
    return null;
  }

  // Show loading state while checking subscription
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950">
          <section className="py-12">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-gradient-to-r from-teal-200 to-blue-200 rounded-lg w-64 mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title="Strategic Narrative Case Studies | LingoLab"
        description="Explore how the world's most successful startups used strategic narrative to drive growth. Learn from Stripe, Notion, Figma and more."
        keywords="strategic narrative, case studies, startup growth, positioning, market creation, fintech, saas"
        canonicalUrl={`${window.location.origin}/case-studies`}
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-teal-950">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 to-blue-600/10"></div>
          <div className="container max-w-6xl mx-auto px-6 relative">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Strategic Narrative Case Studies
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Learn from VC-backed founders who mastered strategic positioning. 
                Discover how elite companies transformed industries through powerful narratives.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="outline" className="border-teal-200 hover:bg-teal-50 dark:border-teal-700 dark:hover:bg-teal-950 px-8 py-3 text-lg" asChild>
                  <Link to="/saved">
                    <Bookmark className="mr-2 h-5 w-5" />
                    My Saved Studies
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="pb-16">
          <div className="container max-w-6xl mx-auto px-6">            
            <div className="relative flex flex-col md:flex-row gap-8">
              {/* Filters - shown as sidebar on desktop, drawer on mobile */}
              <div className="md:w-64 flex-shrink-0">
                <div className="md:sticky md:top-20">
                  <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl border border-teal-200/50 dark:border-teal-700/50 p-6">
                    <FiltersPanel 
                      filters={filterGroups} 
                      activeFilters={activeFilters} 
                      onFilterChange={handleFilterChange} 
                      clearFilters={clearFilters} 
                    />
                  </div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="flex-1">
                {/* Search area */}
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg rounded-2xl border border-teal-200/50 dark:border-teal-700/50 p-6 mb-6">
                  <SearchArea searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </div>
                
                {/* Results count */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                      {caseStudies.length} case studies
                    </span> available for strategic insights
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
      </div>
    </Layout>
  );
};

export default CaseStudies;
