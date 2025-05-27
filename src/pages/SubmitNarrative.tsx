
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useSubmitNarrativeForm } from '@/hooks/useSubmitNarrativeForm';
import CompanyBasicsSection from '@/components/SubmitNarrative/CompanyBasicsSection';
import KeyNarrativeSection from '@/components/SubmitNarrative/KeyNarrativeSection';
import MarketStorySection from '@/components/SubmitNarrative/MarketStorySection';

const SubmitNarrative = () => {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting
  } = useSubmitNarrativeForm();

  return (
    <Layout>
      <section className="py-12">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-semibold mb-4">Submit Your Founder Narrative</h1>
            <p className="text-lg text-muted-foreground">
              Share your strategic narrative and get featured in our case study library
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <CompanyBasicsSection 
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <KeyNarrativeSection 
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <MarketStorySection 
              formData={formData}
              handleInputChange={handleInputChange}
            />

            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Narrative"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default SubmitNarrative;
