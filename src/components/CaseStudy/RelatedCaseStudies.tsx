
import { Separator } from '@/components/ui/separator';
import CaseStudyCard from '@/components/CaseStudyCard';

interface RelatedCaseStudiesProps {
  relatedCaseStudies: any[];
}

const RelatedCaseStudies = ({ relatedCaseStudies }: RelatedCaseStudiesProps) => {
  return (
    <>
      <Separator className="my-12" />
      
      <section className="my-12">
        <h2 className="text-2xl font-semibold mb-6 dark:text-white">Related Case Studies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {relatedCaseStudies.map((study: any) => (
            <CaseStudyCard key={study.id} {...study} />
          ))}
        </div>
      </section>
    </>
  );
};

export default RelatedCaseStudies;
