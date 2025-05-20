import Layout from '@/components/Layout';
import FiltersPanel from '@/components/FiltersPanel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
  
  // Only keep industry filters for companies
  const companyFilters = filterGroups.filter(group => group.name === "Industry");

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold mb-4">Companies Library</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore how the world's most innovative companies use strategic narratives
            </p>
            <div className="mt-4">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
                <Link to="/case-studies">View All Case Studies</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* Filters sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <div className="md:sticky md:top-20">
                <FiltersPanel 
                  filters={companyFilters}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
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
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Companies;
