
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import FiltersPanel from '@/components/FiltersPanel';
import { useToast } from '@/hooks/use-toast';
import { filterGroups } from '@/data/companiesData';
import { useCompaniesFilter } from '@/hooks/useCompaniesFilter';
import SearchArea from '@/components/CaseStudies/SearchArea';
import CompaniesList from '@/components/Companies/CompaniesList';

const Companies = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    activeFilters, 
    handleFilterChange,
    clearFilters,
    visibleCompanies
  } = useCompaniesFilter();
  
  const { toast } = useToast();

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4">Companies</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore companies that have used strategic narratives to drive growth
            </p>
          </div>
          
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* Filters - shown as sidebar on desktop, drawer on mobile */}
            <div className="md:w-64 flex-shrink-0">
              <div className="md:sticky md:top-20">
                <FiltersPanel 
                  filters={filterGroups.filter(g => g.name === "Industry")}
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
                  Showing {visibleCompanies.length} companies
                </p>
              </div>
              
              {/* Results grid */}
              <CompaniesList 
                companies={visibleCompanies}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Companies;
