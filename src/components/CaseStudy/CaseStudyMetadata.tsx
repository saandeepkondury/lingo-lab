
interface CaseStudyMetadataProps {
  narrative: any;
}

const CaseStudyMetadata = ({ narrative }: CaseStudyMetadataProps) => {
  return (
    <div className="container max-w-4xl mx-auto px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {narrative.readTime} • Published {new Date(narrative.publishDate).toLocaleDateString()}
        </div>
        <div className="flex gap-4 text-sm text-gray-500">
          <span>Founded: {narrative.foundedYear}</span>
          <span>Funding: {narrative.fundingRaised}</span>
          <span>Valuation: {narrative.valuation}</span>
        </div>
      </div>
    </div>
  );
};

export default CaseStudyMetadata;
