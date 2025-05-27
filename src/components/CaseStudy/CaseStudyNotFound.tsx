
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import SEOHead from '@/components/SEOHead';

interface CaseStudyNotFoundProps {
  slug?: string;
}

const CaseStudyNotFound = ({ slug }: CaseStudyNotFoundProps) => {
  return (
    <Layout>
      <SEOHead
        title="Narrative Not Found | LingoLab"
        description="The founder narrative you're looking for doesn't exist or has been removed."
        canonicalUrl={`${window.location.origin}/case-studies/${slug || 'not-found'}`}
      />
      <div className="container max-w-4xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Narrative not found</h1>
          <p className="mb-8">The founder narrative you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/case-studies">Back to Narratives</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CaseStudyNotFound;
