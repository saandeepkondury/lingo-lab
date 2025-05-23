
import { useAuth } from '@/context/AuthContext';
import { useSavedCaseStudies } from '@/context/SavedCaseStudiesContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CaseStudyCard from '@/components/CaseStudyCard';
import { allCaseStudies } from '@/data/caseStudiesData';
import { BookmarkX } from 'lucide-react';

const SavedCaseStudies = () => {
  const { isLoggedIn } = useAuth();
  const { savedCaseStudies, removeCaseStudy } = useSavedCaseStudies();

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-4">Saved Case Studies</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Please log in to view your saved case studies.
            </p>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white" asChild>
              <Link to="/join">Login</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const savedCaseStudyData = allCaseStudies.filter(study => 
    savedCaseStudies.includes(study.id)
  );

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-4">Saved Case Studies</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your collection of saved case studies for future reference
          </p>
        </div>

        {savedCaseStudyData.length === 0 ? (
          <div className="text-center py-12">
            <BookmarkX className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No saved case studies yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring case studies and save the ones you find interesting.
            </p>
            <Button asChild>
              <Link to="/case-studies">Browse Case Studies</Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCaseStudyData.map((study) => (
              <div key={study.id} className="relative">
                <CaseStudyCard {...study} />
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                  onClick={() => removeCaseStudy(study.id)}
                >
                  <BookmarkX className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavedCaseStudies;
