
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold text-teal-500 mb-6">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">Looking for strategic narratives?</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-teal-500 hover:bg-teal-600" asChild>
                <Link to="/">Go Home</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/case-studies">Browse Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
